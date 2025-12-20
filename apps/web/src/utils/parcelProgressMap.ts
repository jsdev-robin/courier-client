export enum ParcelStatus {
  BOOKED = 'Booked',
  ASSIGNED = 'Assigned',
  PICKED_UP = 'Picked Up',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  FAILED = 'Failed',
}

export const parcelProgressMap: Record<string, number> = {
  [ParcelStatus.BOOKED]: 20,
  [ParcelStatus.ASSIGNED]: 40,
  [ParcelStatus.PICKED_UP]: 60,
  [ParcelStatus.IN_TRANSIT]: 80,
  [ParcelStatus.DELIVERED]: 100,
  [ParcelStatus.FAILED]: 0,
};
