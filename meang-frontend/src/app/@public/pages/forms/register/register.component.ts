import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '@core/interfaces/forms/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  register: RegisterForm = {
    name: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  };

  constructor() {}

  ngOnInit(): void {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.register.dateOfBirth = currentDate.toISOString().split('T')[0];
  }

  public dateAssignment($event) {
    const dateOfBirth = `${$event.year}-${$event.month}-${$event.day}`;
    this.register.dateOfBirth = dateOfBirth;
  }

  public registerHandler() {
    this.loading = true;
    console.log(this.register);
  }

  private formatNumbers(num: number | string): string {
    return +num < 10 ? `0${num}` : `${num}`;
  }
}
