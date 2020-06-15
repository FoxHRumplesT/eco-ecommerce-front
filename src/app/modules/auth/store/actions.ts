import { createAction, props } from '@ngrx/store';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

export const notificationAction = createAction('[Auth] notification',
  props<{ msg: string, status: NgxNotificationStatusMsg }>()
);

export const loginAction = createAction('[Auth] login', props<{ email: string, password: string }>());
export const loginSuccessAction = createAction('[Auth] login success', props<{ response: any }>());
export const loginErrorAction = createAction('[Auth] login error', props<{ error: any }>());
