import { createAction, props } from '@ngrx/store';

import { Product, Basket, Client } from '../dashboard.entities';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

export const notificationAction = createAction('[Dashboard] notification',
  props<{ msg: string, status: NgxNotificationStatusMsg }>()
);

export const fetchProductsAction = createAction('[Dashboard] fetch products', props<{ page: number, keyword: string }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch products success', props<{ response: any }>());
export const fetchProductsInStockAction = createAction('[Dashboard] fetch products in stock', props<{ page: number, keyword: string }>());
export const fetchProductsInStockSuccessAction = createAction('[Dashboard] fetch products in stock success', props<{ response: any }>());
export const fetchTaxesAction = createAction('[Dashboard] fetch dashboard');
export const fetchTaxesSuccessAction = createAction('[Dashboard] fetch taxes success', props<{ response: any }>());
export const addProductToBasketAction = createAction('[Dashboard] add product to basket', props<{ product: Product }>());
export const updateProductFromBasketAction = createAction('[Dashboard] update product from basket', props<{ product: Product }>());
export const removeProductToBasketAction = createAction('[Dashboard] remove product to basket', props<{ product: Product }>());
export const calculateTaxesInBasketAction = createAction('[Dashboard] calculate taxes in basket', props<{ basket: Basket }>());
export const calculateTaxesInBasketSuccessAction = createAction('[Dashboard] calculate taxes success', props<{ response: any }>());
export const createProductAction = createAction('[Dashboard] create product',
  props<{ product: Product, formDataToUploadImage: FormData }>()
);
export const createProductSuccessAction = createAction('[Dashboard] create product success', props<{ response: any }>());
export const createProductErrorAction = createAction('[Dashboard] create product error');
export const updateProductAction = createAction('[Dashboard] update product', props<{ product: Product }>());
export const updateProductSuccessAction = createAction('[Dashboard] update product success', props<{ response: any }>());
export const updateProductErrorAction = createAction('[Dashboard] update product error');
export const deleteProductAction = createAction('[Dashboard] delete product', props<{ product: Product }>());
export const deleteProductSuccessAction = createAction('[Dashboard] delete product success', props<{ response: any }>());
export const deleteProductErrorAction = createAction('[Dashboard] delete product error');
export const loadImageAction = createAction('[Dashboard] load image', props<{ image: FormData }>());
export const createClientAction = createAction('[Dashboard] create client', props<{ client: Client }>());
export const createClientSuccessAction = createAction('[Dashboard] create client success', props<{ response: any }>());
export const createClientErrorAction = createAction('[Dashboard] create client error');
export const fetchIDNumberAction = createAction('[Dashboard] fetch ID number', props<{ idNumber: number }>());
export const fetchIDNumberSuccessAction = createAction('[Dashboard] fetch ID number success', props<{ response: any }>());
export const setEnableBillButtonAction = createAction('[Dashboard] Enable Bill Button', props<{ state: boolean }>());
