import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '@core/services/password.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  token: string;
  loading: boolean = false;
  changePasswordForm = {
    oldPassword: '',
    newPassword: '',
  };

  constructor(
    private route: ActivatedRoute,
    private passwordService: PasswordService
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
    });
  }

  changePassword() {
    this.passwordService
      .change(this.token, this.changePasswordForm.newPassword)
      .subscribe((result) => {
        if (result.status) {
          basicAlert(result.message, TYPE_ALERT.SUCCESS);
        } else {
          basicAlert(result.message, TYPE_ALERT.WARNING);
        }
      });
  }
}
