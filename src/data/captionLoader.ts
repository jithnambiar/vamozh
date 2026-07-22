/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaptionItem } from "./captions";

export interface LoadedStats {
  totalExisting: number;
  totalImported: number;
  duplicatesSkipped: number;
  finalCombinedCount: number;
}

let extraLoadedCaptions: CaptionItem[] = [];
let isLoaded = false;
let stats: LoadedStats = {
  totalExisting: 300,
  totalImported: 0,
  duplicatesSkipped: 0,
  finalCombinedCount: 300
};

/**
 * Dynamically loads /data/vamozhi-malayalam-captions-1000.json,
 * normalizes incoming records with vm- prefix, checks for exact text duplicates,
 * and caches in memory.
 */
export async function loadAndMerge1000Captions(): Promise<CaptionItem[]> {
  if (isLoaded) {
    return extraLoadedCaptions;
  }

  try {
    const response = await fetch("/data/vamozhi-malayalam-captions-1000.json");
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    const rawCaptions = Array.isArray(data) ? data : (data.captions || []);

    const existingTextSet = new Set<string>();

    let importedCount = 0;
    let dupCount = 0;

    const newNormalizedCaptions: CaptionItem[] = [];

    for (const item of rawCaptions) {
      importedCount++;
      const textNorm = (item.caption || item.text || "").trim();
      const textKey = textNorm.toLowerCase().replace(/\s+/g, " ");

      if (!textNorm) continue;

      // Duplicate protection
      if (existingTextSet.has(textKey)) {
        dupCount++;
        continue;
      }

      existingTextSet.add(textKey);

      const categorySlug = (item.category_slug || item.category || "kerala").toLowerCase();
      const moodSlug = (item.tone_slug || item.mood || item.tone || "classy").toLowerCase();

      const normalizedItem: CaptionItem = {
        id: `vm-${item.id || importedCount}`,
        text: textNorm,
        language: "malayalam",
        category: categorySlug,
        categories: [categorySlug],
        moods: [moodSlug],
        occasions: ["general"],
        tones: [moodSlug],
        platforms: ["instagram", "facebook", "whatsapp", "snapchat", "tiktok"],
        contentTypes: ["photo-caption", "reel-hook"],
        hashtags: [`#${categorySlug}kerala`, "#malayalamquotes", "#vamozhi", `#${categorySlug}`]
      };

      newNormalizedCaptions.push(normalizedItem);
    }

    extraLoadedCaptions = newNormalizedCaptions;
    isLoaded = true;

    stats = {
      totalExisting: 300,
      totalImported: importedCount,
      duplicatesSkipped: dupCount,
      finalCombinedCount: 300 + extraLoadedCaptions.length
    };

    console.log("VAMOZHI 1000 Captions Loaded & Merged:", stats);

    return extraLoadedCaptions;
  } catch (err) {
    console.error("Failed to load /data/vamozhi-malayalam-captions-1000.json:", err);
    return extraLoadedCaptions;
  }
}

export function getLoadedCaptionsSync(): CaptionItem[] {
  return extraLoadedCaptions;
}

export function getCaptionStats(): LoadedStats {
  return stats;
}
