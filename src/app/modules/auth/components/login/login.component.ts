import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthFacade } from '../../auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public img: String;
  public img1: String;
  public img2: String;
  public img3: String;


  constructor(    private authFacade: AuthFacade  ) {
    this.img=environment.logo
    this.img1=environment.logo1
    this.img2=environment.logo2
    this.img3=environment.logo3
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
