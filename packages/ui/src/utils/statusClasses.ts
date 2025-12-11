export type ProductStatus =
  | 'draft'
  | 'active'
  | 'deactive'
  | 'archived'
  | 'recycle_bin';

export const statusClasses: Record<ProductStatus, string> = {
  draft: 'bg-gray-500/25 text-gray-500 border border-gray-500',
  active: 'bg-green-500/25 text-green-500 border border-green-500',
  deactive: 'bg-yellow-500/25 text-yellow-500 border border-yellow-500',
  archived: 'bg-red-500/25 text-red-500 border border-red-500',
  recycle_bin: 'bg-indigo-500/25 text-indigo-500 border border-indigo-500',
};

export const booleanClasses: Record<'true' | 'false', string> = {
  false: 'bg-green-500/25 text-green-500 border border-green-500',
  true: 'bg-yellow-500/25 text-yellow-500 border border-yellow-500',
};
