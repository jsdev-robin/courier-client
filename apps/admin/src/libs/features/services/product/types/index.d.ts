import { User } from '../../auth/types';

type ProductStatus = 'draft' | 'active' | 'deactive' | 'archived';
type ProductType = 'physical' | 'digital' | 'service' | 'bundle';
type DiscountType = 'fixed' | 'percentage';
type ShippingCostType = 'fixed' | 'calculated';
type ShippingClass = 'standard' | 'express' | 'bulk' | 'fragile';
type ResourceType = 'image' | 'video';
type MetaRobots =
  | ''
  | 'index,follow'
  | 'noindex'
  | 'nofollow'
  | 'noindex,nofollow';
type OgType = 'website' | 'article' | 'product';
type TwitterCard = 'summary' | 'summary_large_image';
type DimensionUnit = 'cm' | 'in' | 'm';

interface Media {
  resource_type: ResourceType;
  public_id: string;
  url: string;
  secure_url: string;
}

interface Categories {
  primary: string;
  secondary: string;
  tertiary: string;
}

interface Pricing {
  basePrice: string;
  salePrice: string;
  priceCurrency: string;
  discountType: DiscountType;
  discountValue: string;
  shippingCost: string;
  shippingCostType: ShippingCostType;
  discountStartDate?: Date;
  discountEndDate?: Date;
}

interface Attribute {
  name?: string;
  type?: 'select' | 'text' | 'checkbox' | 'number';
  options?: string[];
  required?: boolean;
  value?: string | number | boolean | string[] | number[] | boolean[] | null;
}

interface Variant {
  sellerSKU?: string;
  attributes: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[] | null
  >;
  price?: string;
  salePrice?: string;
  stockQuantity: string;
}

interface Shipping {
  isFreeShipping: boolean;
  requiresShipping: boolean;
  shippingClass?: ShippingClass;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    unit: DimensionUnit;
  };
}

interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  metaRobots?: MetaRobots;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: OgType;
  ogSiteName?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: TwitterCard;
}

interface ProductBase {
  basicInfo: {
    title: string;
    description: string;
    brand?: string;
    productType: ProductType;
    sellerSku: string;
  };
  media: Media[];
  categories: Categories;
  pricing: Pricing;
  attributes: Attribute[];
  variants?: Variant[];
  shipping?: Shipping;
  seo: SEO;
  status: ProductStatus;
  isAdult: boolean;
}

export interface Product extends ProductBase {
  _id: stirng;
  id: string;
  seller: User;
  basicInfo: ProductBase['basicInfo'] & {
    sku: string;
    barcode: string;
    qrCode: string;
    slug: string;
  };
  isActive: boolean;
}

export type FindProductResponse = PaginatedResponse<Product>;
