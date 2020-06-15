import { createAction, props } from '@ngrx/store';

export const fetchProductsAction = createAction('[Dashboard] fetch products', props<{ page: number }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch products success', props<{ response: any }>());
export const fetchTaxesAction = createAction('[Dashboard] fetch dashboard');
export const fetchTaxesSuccessAction = createAction('[Dashboard] fetch taxes success', props<{ response: any }>());
