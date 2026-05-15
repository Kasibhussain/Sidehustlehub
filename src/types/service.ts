export type Service = {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  price: number;
  deliveryNote: string | null;
  createdAt: string;
};

export type CreateServiceInput = {
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  price: number;
  deliveryNote: string | null;
};
