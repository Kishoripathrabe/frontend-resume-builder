
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <form class="overlay" fxLayoutAlign="center center"
          fxLayout="column"
          fxLayoutGap="40px" (ngSubmit)="this.loginForm.valid && login()" [formGroup]="this.loginForm">
      <img width="20%" src="../assets/digiresume-green.png">
      <mat-card fxLayout="column">
        <h2>Login</h2>
        <mat-form-field>
          <input formControlName="email" type="email" matInput placeholder="Email"/>
          <mat-error>Valid Email is Required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input formControlName="password" type="password" matInput placeholder="Password"/>
          <mat-error> (8-12 Digit) Password is Required</mat-error>
        </mat-form-field>
        <a style="margin-top: 2rem;" href="#">Forgot Password?</a>
        <div style="margin-top: 2rem" fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="end">
          <button type="submit" color="primary" mat-raised-button>Login</button>
          <button (click)="this.signup()" type="button" color="accent" mat-raised-button>Signup</button>
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
  mySubject = new BehaviorSubject('hello world!');
  observer: Observable<any>;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(8)])
    });
    const observableA = this.loginForm.valueChanges;
    const observableB = new Observable((emitter) => {
      emitter.next('hello');
    });
    this.observer = this.loginForm.valueChanges.pipe(map(data => data.email),debounceTime(500),distinctUntilChanged());
    this.observer.subscribe(data =>{
  console.log("debounce",data);
})

  }



  login() {
    this.mySubject.next(this.loginForm.value);
  }

  signup(){
    this.mySubject.subscribe((data:any) => {
      console.log(data);
    });
  }
}

