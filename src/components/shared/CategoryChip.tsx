/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CategoryChipProps {
  key?: string | number;
  id: string;
  nameEn: string;
  nameMl: string;
  emoji: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryChip({ id, nameEn, nameMl, emoji, isSelected, onClick }: CategoryChipProps) {
  return (
    <button
      key={id}
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
        isSelected
          ? "bg-purple-950 text-white shadow-md ring-2 ring-purple-500/50"
          : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-purple-50 dark:hover:bg-neutral-700"
      }`}
      aria-pressed={isSelected}
      aria-label={`Category ${nameEn} (${nameMl})`}
    >
      <span>{emoji}</span>
      <span>{nameMl}</span>
    </button>
  );
}
