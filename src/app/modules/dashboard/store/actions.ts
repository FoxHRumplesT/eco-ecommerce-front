import { createAction, props } from '@ngrx/store';

import { Product, CalculateTaxesPayload } from '../dashboard.entities';

export const fetchProductsAction = createAction('[Dashboard] fetch products', props<{ page: number }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch products success', props<{ response: any }>());
export const fetchTaxesAction = createAction('[Dashboard] fetch dashboard');
export const fetchTaxesSuccessAction = createAction('[Dashboard] fetch taxes success', props<{ response: any }>());
export const addProductToBasketAction = createAction('[Dashboard] add product to basket', props<{ product: Product }>());
export const updateProductFromBasketAction = createAction('[Dashboard] update product from basket', props<{ product: Product }>());
export const removeProductToBasketAction = createAction('[Dashboard] remove product to basket', props<{ product: Product }>());
export const calculateTaxesInBasket = createAction('[Dashboard] calculate taxes in basket', props<{ payload: CalculateTaxesPayload[] }>());
export const calculateTaxesInBasketSuccess = createAction('[Dashboard] calculate taxes success', props<{ response: any }>());
