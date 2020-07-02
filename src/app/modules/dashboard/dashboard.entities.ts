export class Product {
  id: number;
  name: string;
  url_image: string;
  value: number;
  tax: number[];
  lot: string;
  quantity: number;
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

export class Result
{
    summary: Summary[];
    total: number;
}

export class Summary
{
  productTotal: number;
  taxTotal: number;
  quantity: number;
  product: Product;
  tax: Tax;
}


