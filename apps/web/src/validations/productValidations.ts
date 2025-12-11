import { z } from 'zod';

const create = z.object({
  basicInfo: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    brand: z.string().optional(),
    productType: z.enum(['physical', 'digital', 'service', 'bundle']),
    sellerSku: z.string().min(1, 'Variant SKU is required'),
    lexical: z.string().min(1, 'Editor is required'),
  }),

  media: z
    .array(
      z.object({
        resource_type: z.enum(['image', 'video']),
        public_id: z.string().min(1, 'Public ID is required'),
        url: z.url('URL must be valid'),
        secure_url: z.url('Secure URL must be valid'),
      }),
    )
    .min(1, 'At least one media item is required')
    .max(12, 'You cannot upload more than 12 media items'),

  categories: z.object({
    primary: z.string().min(1, 'Primary is required'),
    secondary: z.string().min(1, 'Secondary is required'),
    tertiary: z.string().min(1, 'Tertiary is required'),
  }),

  pricing: z.object({
    basePrice: z.string().min(1, 'Base price is required'),
    salePrice: z.string().min(1, 'Sale price is required'),
    priceCurrency: z.string().min(1, 'Currency is required'),
    discountType: z.enum(['fixed', 'percentage']),
    discountValue: z.string().min(1, 'Discount value is required'),
    shippingCost: z.string().min(1, 'Shipping cost is required'),
    shippingCostType: z.enum(['fixed', 'calculated']),
    discountStartDate: z.date().optional(),
    discountEndDate: z.date().optional(),
  }),

  attributes: z.array(
    z.object({
      name: z.string().optional(),
      type: z.enum(['select', 'text', 'checkbox', 'number']).optional(),
      options: z.array(z.string()).optional(),
      required: z.boolean().optional(),
      value: z.any().optional(),
    }),
  ),

  variants: z
    .array(
      z.object({
        sellerSKU: z.string().optional(),
        attributes: z.record(z.string(), z.any()),
        price: z.string().min(0).optional(),
        salePrice: z.string().min(0).optional(),
        stockQuantity: z.string(),
      }),
    )
    .optional(),

  shipping: z
    .object({
      isFreeShipping: z.boolean(),
      requiresShipping: z.boolean(),
      shippingClass: z
        .enum(['standard', 'express', 'bulk', 'fragile'])
        .optional(),
      dimensions: z
        .object({
          length: z.string().min(1, 'Length is required').optional(),
          width: z.string().min(1, 'Width is required').optional(),
          height: z.string().min(1, 'Height is required').optional(),
          unit: z.enum(['cm', 'in', 'm']),
        })
        .optional(),
    })
    .optional(),

  seo: z.object({
    metaTitle: z.string().max(160).optional(),
    metaDescription: z.string().max(300).optional(),
    canonicalUrl: z.union([z.url(), z.literal('')]).optional(),
    metaRobots: z
      .enum(['index,follow', 'noindex', 'nofollow', 'noindex,nofollow'])
      .optional(),

    ogTitle: z.string().max(160).optional(),
    ogDescription: z.string().max(300).optional(),
    ogImage: z.union([z.url(), z.literal('')]).optional(),
    ogType: z.enum(['website', 'article', 'product']).optional(),
    ogSiteName: z.string().optional(),
    ogUrl: z.union([z.url(), z.literal('')]).optional(),

    twitterTitle: z.string().max(160).optional(),
    twitterDescription: z.string().max(300).optional(),
    twitterImage: z.union([z.url(), z.literal('')]).optional(),
    twitterCard: z.enum(['summary', 'summary_large_image']).optional(),
  }),

  status: z.enum(['draft', 'active', 'deactive']).optional(),
  isAdult: z.boolean(),
});

export const productSchema = {
  create,
};
