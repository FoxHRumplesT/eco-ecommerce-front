export class Product {
  id: number;
  name: string;
  url_image: string;
  value: number;
  tax: number[];
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
