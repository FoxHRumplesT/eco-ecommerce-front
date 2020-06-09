import { createAction, props } from '@ngrx/store';

export const fetchProductsAction = createAction('[Dashboard] fetch dashboard', props<{ page: number }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch dashboard success', props<{ response: any }>());
