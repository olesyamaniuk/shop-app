export type Comment = {
  id: number;
  productId: number;
  description: string;
  date: string;
};

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: { width: number; height: number };
  weight: string;

  comments?: Comment[];
};

export type SortKey = 'name-asc' | 'name-desc' | 'count-asc' | 'count-desc';
