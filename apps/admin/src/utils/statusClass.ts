export enum ParcelStatus {
  BOOKED = 'Booked',
  ASSIGNED = 'Assigned',
  PICKED_UP = 'Picked Up',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  FAILED = 'Failed',
}

export const statusClass: Record<ParcelStatus, string> = {
  [ParcelStatus.BOOKED]: 'bg-blue-500/5 text-blue-500',
  [ParcelStatus.ASSIGNED]: 'bg-yellow-500/5 text-yellow-500',
  [ParcelStatus.PICKED_UP]: 'bg-purple-500/5 text-purple-500',
  [ParcelStatus.IN_TRANSIT]: 'bg-indigo-500/5 text-indigo-500',
  [ParcelStatus.DELIVERED]: 'bg-green-500/5 text-green-500',
  [ParcelStatus.FAILED]: 'bg-red-500/5 text-red-500',
};
