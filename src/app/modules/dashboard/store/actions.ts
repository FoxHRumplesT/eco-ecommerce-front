import { createAction, props } from '@ngrx/store';

import { Product, CalculateTaxesPayload, Basket } from '../dashboard.entities';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

export const notificationAction = createAction('[Dashboard] notification',
  props<{ msg: string, status: NgxNotificationStatusMsg }>()
);

export const fetchProductsAction = createAction('[Dashboard] fetch products', props<{ page: number }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch products success', props<{ response: any }>());
export const fetchTaxesAction = createAction('[Dashboard] fetch dashboard');
export const fetchTaxesSuccessAction = createAction('[Dashboard] fetch taxes success', props<{ response: any }>());
export const addProductToBasketAction = createAction('[Dashboard] add product to basket', props<{ product: Product }>());
export const updateProductFromBasketAction = createAction('[Dashboard] update product from basket', props<{ product: Product }>());
export const removeProductToBasketAction = createAction('[Dashboard] remove product to basket', props<{ product: Product }>());
export const calculateTaxesInBasket = createAction('[Dashboard] calculate taxes in basket', props<{ basket: Basket }>());
export const calculateTaxesInBasketSuccess = createAction('[Dashboard] calculate taxes success', props<{ response: any }>());
export const createProductAction = createAction('[Dashboard] create product', props<{ product: Product }>());
export const createProductSuccess = createAction('[Dashboard] create product success', props<{ response: any }>());
export const updateProductAction = createAction('[Dashboard] update product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Dashboard] update product success', props<{ response: any }>());
export const deleteProductAction = createAction('[Dashboard] delete product', props<{ product: Product }>());
export const deleteProductSuccess = createAction('[Dashboard] delete product success', props<{ response: any }>());
export const deleteProductError = createAction('[Dashboard] delete product error');
export const loadImageAction = createAction('[Dashboard] load image', props<{ image: FormData }>());
