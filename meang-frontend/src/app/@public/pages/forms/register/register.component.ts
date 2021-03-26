import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  RegisterData,
  RegisterForm,
} from '@core/interfaces/forms/register.interface';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

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

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.register.dateOfBirth = currentDate.toISOString().split('T')[0];
  }

  public dateAssignment($event) {
    const dateOfBirth = `${$event.year}-${this.formatNumbers(
      $event.month
    )}-${this.formatNumbers($event.day)}`;
    this.register.dateOfBirth = dateOfBirth;
  }

  public registerHandler() {
    this.loading = true;

    this.usersService
      .register(this.mapRegisterForm2RegisterData(this.register))
      .subscribe(
        (result) => {
          this.loading = false;
          if (result.status) {
            basicAlert(result.message, TYPE_ALERT.SUCCESS);
            this.router.navigate(['/login']);
          } else {
            basicAlert(result.message, TYPE_ALERT.ERROR);
          }
          console.log('Result', result);
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  private formatNumbers(num: number | string): string {
    return +num < 10 ? `0${num}` : `${num}`;
  }

  private mapRegisterForm2RegisterData({
    name,
    lastname,
    email,
    dateOfBirth,
    password,
  }: RegisterForm): RegisterData {
    return {
      name,
      lastname,
      email,
      dateOfBirth,
      password,
    };
  }
}
