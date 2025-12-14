export enum ParcelSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
}

export const sizeClass: Record<ParcelSize, string> = {
  [ParcelSize.SMALL]: 'bg-green-500/5 text-green-500',
  [ParcelSize.MEDIUM]: 'bg-yellow-500/5 text-yellow-500',
  [ParcelSize.LARGE]: 'bg-red-500/5 text-red-500',
};
