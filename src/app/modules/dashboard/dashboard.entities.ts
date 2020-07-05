export class Product {
  id: number;
  name: string;
  url_image: string;
  value: number;
  tax: number[];
  lot: string;
  quantity: number;
  code: string;
  is_free: boolean;
}

export class Tax {
  id: number;
  type: string;
  name: string;
  value: number;
  percent_value: number;
}

export class Basket {
  products: Product[];
}

export class Result {
  summary: Summary[];
  total: number;
}

export class Summary {
  productTotal: number;
  taxTotal: number;
  quantity: number;
  product: Product;
  tax: Tax;
}

export class CalculateTaxesPayload {
  code: string;
  quantity: number;
  lot: string;
  value: number;
  is_free: boolean;
}
