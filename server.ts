/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { generateCaptions } from "./src/data/captions";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google Gen AI lazily
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error("Failed to initialize Google Gen AI client:", e);
    }
  }
  return aiClient;
}

// Parse request body JSON
app.use(express.json());

// API: Generate captions
app.post("/api/generate", async (req, res) => {
  try {
    const {
      platform = "instagram",
      contentType = "photo-caption",
      language = "malayalam",
      category = "kerala",
      mood = "cheerful",
      occasion = "general",
      tone = "classy",
      length = "medium",
      emojiSetting = "minimal",
      resultsCount = 5,
      keyword = "",
      hashtagCount = "5"
    } = req.body;

    // Validate inputs
    const cleanPlatform = String(platform).trim().toLowerCase().slice(0, 50);
    const cleanContentType = String(contentType).trim().toLowerCase().slice(0, 50);
    const cleanLanguage = String(language).trim().toLowerCase().slice(0, 20) as 'malayalam' | 'manglish' | 'english' | 'mixed';
    const cleanCategory = String(category).trim().toLowerCase().slice(0, 50);
    const cleanMood = String(mood).trim().toLowerCase().slice(0, 50);
    const cleanOccasion = String(occasion).trim().toLowerCase().slice(0, 50);
    const cleanTone = String(tone).trim().toLowerCase().slice(0, 50);
    const cleanLength = String(length).trim().toLowerCase().slice(0, 20) as 'one-line' | 'short' | 'medium' | 'detailed';
    const cleanEmojiSetting = String(emojiSetting).trim().toLowerCase().slice(0, 20) as 'none' | 'minimal' | 'more';
    const cleanResultsCount = Math.min(Math.max(parseInt(resultsCount, 10) || 5, 1), 20);
    const cleanKeyword = String(keyword).trim().replace(/[^\w\s\u0D00-\u0D7F]/g, "").slice(0, 100);
    const cleanHashtagCount = String(hashtagCount).trim().toLowerCase().slice(0, 10);

    const localOptions = {
      platform: cleanPlatform,
      contentType: cleanContentType,
      language: cleanLanguage,
      category: cleanCategory,
      mood: cleanMood,
      occasion: cleanOccasion,
      tone: cleanTone,
      length: cleanLength,
      emojiSetting: cleanEmojiSetting,
      resultsCount: cleanResultsCount,
      keyword: cleanKeyword,
      hashtagCount: cleanHashtagCount as 'none' | '5' | '10' | '15'
    };

    const ai = getAIClient();
    if (ai) {
      try {
        const prompt = `Generate exactly ${cleanResultsCount} original social writing options for the following parameters:
- Platform: ${cleanPlatform}
- Content Type: ${cleanContentType} (e.g. caption, bio, hook, status, greeting, pickup_line)
- Language: ${cleanLanguage}
- Vibe Category: ${cleanCategory}
- Mood style: ${cleanMood}
- Occasion: ${cleanOccasion}
- Tone style: ${cleanTone}
- Output Length: ${cleanLength}
- Emoji Level: ${cleanEmojiSetting} (none, minimal, or more)
- Keyword / Topic to include: "${cleanKeyword}"
- Hashtags target: ${cleanHashtagCount}

Return your response strictly as a JSON array of objects conforming to this schema, with no markdown code fence or wrapping text outside the JSON:
[
  {
    "text": "The custom generated caption/bio/pickup line text",
    "hashtags": ["#Tag1", "#Tag2"]
  }
]

IMPORTANT INSTRUCTIONS:
1. Ensure the captions are highly original, engaging, and specifically crafted for Kerala culture / Malayali audiences.
2. In Malayalam mode, use proper Malayalam script (മലയാളം). In Manglish mode, use proper English letters with natural sounding Manglish words. In English mode, write in perfect natural English. In Mixed mode, combine them organically.
3. NEVER copy copyrighted lyrics, poems, or movie dialogues.
4. Keep dating, matrimony, and pickup lines highly respectful, safe, family-appropriate and classy.
5. If keyword is provided, weave it organically into the text in an appropriate, elegant manner.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are VAMOZHI, a production-grade Malayalam social writing assistant. You write perfect captions, bios, and hooks for Instagram, Facebook, and dating profiles. Always output strict JSON arrays.",
            responseMimeType: "application/json"
          }
        });

        const textResponse = response.text;
        if (textResponse) {
          try {
            const parsedResults = JSON.parse(textResponse);
            if (Array.isArray(parsedResults) && parsedResults.length > 0) {
              const formattedResults = parsedResults.map((item: any, idx: number) => {
                const textVal = String(item.text || "").trim();
                const tagsVal = Array.isArray(item.hashtags) 
                  ? item.hashtags.map((h: any) => String(h).trim().startsWith("#") ? String(h).trim() : `#${String(h).trim()}`)
                  : [];
                return {
                  id: `gemini_${cleanCategory}_${idx}`,
                  text: textVal,
                  hashtags: tagsVal.slice(0, cleanHashtagCount === 'none' ? 0 : parseInt(cleanHashtagCount, 10) || 5),
                  platform: cleanPlatform,
                  language: cleanLanguage,
                  mood: cleanMood,
                  occasion: cleanOccasion,
                  charCount: textVal.length + (tagsVal.join(" ").length)
                };
              });

              return res.json({
                results: formattedResults,
                isFallbackUsed: false,
                message: "Generated professional AI captions using Gemini 2.5-flash!"
              });
            }
          } catch (jsonErr) {
            console.error("Failed to parse Gemini output, falling back to database:", jsonErr);
          }
        }
      } catch (geminiErr) {
        console.error("Gemini API execution error, falling back to local:", geminiErr);
      }
    }

    // Call local database fallback engine
    const localResult = generateCaptions(localOptions);
    return res.json(localResult);

  } catch (error: any) {
    console.error("Core generation service error:", error);
    return res.status(500).json({ error: "Failed to generate captions." });
  }
});

// Serve AMP landing page on /amp and /amp/
const serveAmpPage = (req: express.Request, res: express.Response) => {
  res.send(`<!doctype html>
<html amp lang="ml">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>VAMOZHI - Fast Malayalam Caption Generator & Social Writing Platform</title>
    <link rel="canonical" href="https://vamozhi.com/">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #1e1b4b;
        background-color: #faf9f6;
        margin: 0;
        padding: 0;
      }
      header {
        background: linear-gradient(135deg, #4c1d95, #db2777);
        color: white;
        padding: 20px;
        text-align: center;
      }
      h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 900;
        letter-spacing: -0.5px;
      }
      .tagline {
        font-size: 14px;
        opacity: 0.9;
        margin-top: 5px;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 0 15px;
      }
      .card {
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        margin-bottom: 20px;
        border: 1px solid #e2e8f0;
      }
      h2 {
        color: #4c1d95;
        font-size: 18px;
        margin-top: 0;
        border-bottom: 2px solid #f472b6;
        padding-bottom: 5px;
      }
      .btn {
        display: block;
        background: linear-gradient(90deg, #db2777, #f43f5e);
        color: white;
        text-align: center;
        padding: 12px;
        text-decoration: none;
        border-radius: 12px;
        font-weight: bold;
        margin-top: 20px;
        box-shadow: 0 4px 10px rgba(219,39,119,0.2);
      }
      .caption-item {
        background: #fdf2f8;
        border-left: 4px solid #db2777;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 0 8px 8px 0;
        font-size: 14px;
      }
      footer {
        text-align: center;
        padding: 30px;
        font-size: 12px;
        color: #64748b;
        background: #f1f5f9;
        margin-top: 40px;
      }
    </style>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
  </head>
  <body>
    <header>
      <h1>VAMOZHI</h1>
      <div class="tagline">Your Vibe. Your Words. In Malayalam.</div>
    </header>
    <div class="container">
      
      <!-- AMP AD SLOT -->
      <amp-ad width="100vw" height="320"
        type="adsense"
        data-ad-client="ca-pub-8686383954199850"
        data-ad-slot="3963293716"
        data-auto-format="rspv"
        data-full-width="">
        <div overflow=""></div>
      </amp-ad>

      <div class="card">
        <h2>🚀 Accelerated Social Writing Platform</h2>
        <p>Vamozhi is Kerala's premium writing assistant to generate highly original, engaging social media captions, Instagram bios, and Reel hooks in Malayalam and Manglish. Optimized for speed and absolute readability.</p>
        <a href="https://vamozhi.com/" class="btn">Launch Interactive App</a>
      </div>

      <div class="card">
        <h2>🔥 Trending Malayalam Captions</h2>
        <div class="caption-item">
          <strong>Love:</strong> നിന്റെ കൂടെയുള്ള ഓരോ നിമിഷവും എന്റെ ജീവിതത്തിലെ ഏറ്റവും മനോഹരമായ ഓർമ്മയാണ്. ❤️
        </div>
        <div class="caption-item">
          <strong>Attitude:</strong> നമ്മുടെ വഴി നമ്മൾ തന്നെ വെട്ടിത്തുറക്കും, ആരുടെയും അനുവാദം ആവശ്യമില്ല! 😎⚡
        </div>
        <div class="caption-item">
          <strong>Travel:</strong> വഴികൾ തീരുന്നിടത്ത് പുതിയ കാഴ്ചകൾ തുടങ്ങുന്നു. വണ്ടി ഭ്രാന്തൻ! 🏔️✈️
        </div>
        <div class="caption-item">
          <strong>Kerala:</strong> ദൈവത്തിന്റെ സ്വന്തം നാട്ടിലെ ഈ പച്ചപ്പും കായലുകളും ഒരു പ്രത്യേക സുഖമാണ്. 🌴🥥
        </div>
      </div>

      <div class="card">
        <h2>💡 Frequently Asked Questions</h2>
        <p><strong>Is Vamozhi free?</strong> Yes! Vamozhi is 100% free with original Malayalam collections.</p>
        <p><strong>Do you store typed text?</strong> No, all transliteration and saving happens safely inside your local device storage.</p>
      </div>

    </div>
    <footer>
      &copy; 2026 VAMOZHI. All Rights Reserved.<br>
      Optimized for lightning-fast mobile experience.
    </footer>
  </body>
</html>`);
};

app.get("/amp", serveAmpPage);
app.get("/amp/", serveAmpPage);

// Setup dev vs production environments
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite in development middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vamozhi server listening on http://localhost:${PORT}`);
  });
}

startServer();
