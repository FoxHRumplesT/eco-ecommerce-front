import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthReducers } from './store/reducers';
import { AuthEffects } from './store/effects';
import { AuthFacade } from './auth.facade';
import { AuthServices } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', AuthReducers),
    EffectsModule.forFeature([ AuthEffects ]),
    AuthRoutingModule
  ],
  providers: [
    AuthFacade,
    AuthServices,
    AuthGuard
  ]
})
export class AuthModule { }
