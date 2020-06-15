import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthFacade } from '../../auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private authFacade: AuthFacade
  ) {
    const { required, email } = Validators;
    this.form = new FormGroup({
      user: new FormControl('', [required, email]),
      password: new FormControl('', [required])
    });
  }

  ngOnInit(): void {
  }

  public login(): void {
    const { user, password } = this.form.value;
    this.authFacade.login(user, password);
  }

  public submit(): void {
    this.login();
  }

}
