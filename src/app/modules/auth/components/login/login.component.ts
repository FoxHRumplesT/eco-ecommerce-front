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
  public logoUrl = 'assets/img/logo.jpg';
  public backgroundUrl = 'assets/img/background.jpg';

  constructor(
    private authFacade: AuthFacade
  ) {
    const { required, email } = Validators;
    this.form = new FormGroup({
      user: new FormControl('diegosuarezmayo@gmail.com', [required, email]),
      password: new FormControl('diego', [required])
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
