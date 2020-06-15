import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from './store/actions';

@Injectable()
export class AuthFacade {
  constructor(
    private store: Store
  ) {}

  public login(email: string, password: string): void {
    this.store.dispatch(actions.loginAction({ email, password }));
  }
}
