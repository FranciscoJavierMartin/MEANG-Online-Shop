import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE_SESSION } from '@core/constants/localStorage';
import { LoginForm } from '@core/interfaces/forms/login.interface';
import { ResultLogin } from '@core/interfaces/results/login.interface';
import { AuthService } from '@core/services/auth.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  login: LoginForm = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.start();
  }

  loginHandler() {
    this.loading = true;
    this.auth
      .login(this.login.email, this.login.password)
      .subscribe((result: ResultLogin) => {
        this.loading = false;
        if (result.status && result.token) {
          basicAlert(result.message, TYPE_ALERT.SUCCESS);
          this.auth.setSession(result.token);
        } else if (result.status) {
          basicAlert(result.message, TYPE_ALERT.WARNING);
        }
      });
  }
}
