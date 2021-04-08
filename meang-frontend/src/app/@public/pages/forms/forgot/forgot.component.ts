import { Component } from '@angular/core';
import { EMAIL_PATTERN } from '@core/constants/regexp';
import { PasswordService } from '@core/services/password.service';
import { basicAlert } from '@shared/alerts/toasts';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  emailPattern = EMAIL_PATTERN;
  forgotPasswordForm = {
    email: '',
  };

  constructor(private passwordService: PasswordService) {}

  reset() {
    this.passwordService
      .reset(this.forgotPasswordForm.email)
      .subscribe((result) => {
        if (result.status) {
        }
      });
  }
}
