export class Product {
  id: number;
  name: string;
  url_image?: string;
  urlImage?: string;
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
  summary: any[];
  total: number;
  total_product: number;
  tax: number;
}

export class SummaryTax {
  product_value: number;
  tax_value: number;
  total: number;
  quantity: number;
  product: Product;
  tax: Tax[];
}

export class ProductsResponse {
  results: Product[];
  page: number;
  per_page: number;
  total: number;
}

export class Client {
  document_type: string;
  number_identification: string;
  name: string;
  lastname: string;
  last_name: string;
  email: string;
  phone: number;
  new: boolean;
  country_code: string;
}
