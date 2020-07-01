import { createAction, props } from '@ngrx/store';

import { Product, Basket } from '../dashboard.entities';

export const fetchProductsAction = createAction('[Dashboard] fetch products', props<{ page: number }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch products success', props<{ response: any }>());
export const fetchTaxesAction = createAction('[Dashboard] fetch dashboard');
export const fetchTaxesSuccessAction = createAction('[Dashboard] fetch taxes success', props<{ response: any }>());
export const addProductToBasketAction = createAction('[Dashboard] add product to basket', props<{ product: Product }>());
export const removeProductToBasketAction = createAction('[Dashboard] remove product to basket', props<{ product: Product }>());
export const calculateTaxesInBasket = createAction('[Dashboard] calculate taxes in basket', props<{ basket: Basket }>());
