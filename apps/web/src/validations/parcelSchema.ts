import { z } from 'zod';

export const create = z.object({
  deliveryAddress: z.object({
    street: z.string().nonempty('Street is required'),
    city: z.string().nonempty('City is required'),
    state: z.string().nonempty('State is required'),
    postalCode: z.string().nonempty('Postal code is required'),
    location: z.object({
      coordinates: z.tuple([
        z.string().nonempty('Latitude is required'),
        z.string().nonempty('Longitude is required'),
      ]),
    }),
    contactName: z.string().nonempty('Contact name is required'),
    contactPhone: z.string().nonempty('Contact phone is required'),
  }),
  parcelDetails: z.object({
    size: z.string().nonempty('Parcel size is required'),
    weight: z.string().nonempty('Weight is required'),
    category: z.string().nonempty('Parcel category is required'),
    description: z.string().optional(),
  }),
  payment: z.object({
    method: z.string().nonempty('Payment method is required'),
    amount: z.string().nonempty('Amount is required'),
    codAmount: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const parcelSchema = {
  create,
};
