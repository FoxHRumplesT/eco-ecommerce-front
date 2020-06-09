import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      user: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

}
