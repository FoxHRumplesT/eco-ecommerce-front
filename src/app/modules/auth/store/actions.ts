import { createAction, props } from '@ngrx/store';

export const loginAction = createAction('[Auth] login', props<{ email: string, password: string }>());
export const loginSuccessAction = createAction('[Auth] login success', props<{ response: any }>());
