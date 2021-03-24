import { Component } from '@angular/core';
import { LoginForm } from '@core/interfaces/forms/login.interface';
import { ResultLogin } from '@core/interfaces/results/login';
import { AuthService } from '@core/services/auth.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  login: LoginForm = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  loginHandler() {
    this.loading = true;
    this.auth
      .login(this.login.email, this.login.password)
      .subscribe((result: ResultLogin) => {
        this.loading = false;
        if (result.status && result.token) {
          basicAlert(result.message, TYPE_ALERT.SUCCESS);
        } else if (result.status) {
          basicAlert(result.message, TYPE_ALERT.WARNING);
        }
      });
  }
}
