export enum PaymentStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  FAILED = 'Failed',
}

export const paymentStatusClass: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'bg-yellow-500/5 text-yellow-500',
  [PaymentStatus.PAID]: 'bg-green-500/5 text-green-500',
  [PaymentStatus.FAILED]: 'bg-red-500/5 text-red-500',
};
