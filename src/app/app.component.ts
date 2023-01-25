import {Component} from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <form [formGroup]="this.loginForm" (ngSubmit)="this.loginForm.valid && login()" class="overlay" fxLayoutAlign="center center" fxLayout="column" fxLayoutGap="40px">
      <img width="20%" src="../assets/digiresume-green.png">
      <mat-card fxLayout="column">
        <h2>Login</h2>
        <mat-form-field >
          <input formControlName="email" type="email" matInput placeholder="Email"/>
          <mat-error>Valid Email is Required</mat-error>
        </mat-form-field>
        <mat-form-field >
          <input formControlName="password" type="password" matInput placeholder="Password"/>
          <mat-error>(8-12 Digit) Password is Required</mat-error>
        </mat-form-field>
        <a style="margin-top: 2rem" href="#">Forgot Password?</a>
        <div style="margin-top: 2rem" fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="end">
          <button type="submit" (click)="login()" color="primary" mat-raised-button>Login</button>
          <button color="accent" mat-raised-button>Signup</button>
        </div>
      </mat-card>
  </form>
  `,
  styles: [`
    .overlay {
      width: 100%;
      height: 100%;
    }

    button {
      color: white !important;
    }

    mat-card {
      height: 20rem;
      width: 25rem;
    }
  `]
})
export class AppComponent {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.maxLength(12),Validators.minLength(8)])
   });
  }
  login() {
    console.log(this.loginForm.value);
  }
}

