export enum PaymentType {
  COD = 'COD',
  PREPAID = 'Prepaid',
}

export const paymentClass: Record<PaymentType, string> = {
  [PaymentType.COD]: 'bg-orange-500/5 text-orange-500',
  [PaymentType.PREPAID]: 'bg-teal-500/5 text-teal-500',
};
