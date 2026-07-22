/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CategoryChip from "./CategoryChip";

export interface CategoryItem {
  id: string;
  nameEn: string;
  nameMl: string;
  emoji: string;
}

interface CategorySelectorProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  title?: string;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
  title = "വിഭാഗം തിഞ്ഞെടുക്കൂ (Categories):"
}: CategorySelectorProps) {
  return (
    <div className="space-y-2 text-left" id="category-selector-bar">
      {title && (
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
      )}
      
      {/* Flexible & responsive category pills container */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {categories.map((cat) => (
          <CategoryChip
            key={cat.id}
            id={cat.id}
            nameEn={cat.nameEn}
            nameMl={cat.nameMl}
            emoji={cat.emoji}
            isSelected={selectedCategory === cat.id}
            onClick={() => onSelectCategory(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
