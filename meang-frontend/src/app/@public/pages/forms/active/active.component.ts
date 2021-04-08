import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMAIL_PATTERN } from '@core/constants/regexp';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  emailPattern = EMAIL_PATTERN;
  token: string;
  loading: boolean = false;
  activeForm = {
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
      console.log(this.token);
    });
  }

  ngOnInit(): void {}

  public add(): void {
    this.usersService
      .active(this.token, this.activeForm.dateOfBirth, this.activeForm.password)
      .subscribe((result) => {
        if (result.status) {
          basicAlert(result.message, TYPE_ALERT.SUCCESS);
          this.router.navigate(['login']);
        } else {
          basicAlert(result.message, TYPE_ALERT.WARNING);
        }
      });
  }

  public dateAssignment($event): void {
    const dateOfBirth = `${$event.year}-${this.formatNumbers(
      $event.month
    )}-${this.formatNumbers($event.day)}`;
    this.activeForm.dateOfBirth = dateOfBirth;
  }

  private formatNumbers(num: number | string): string {
    return +num < 10 ? `0${num}` : `${num}`;
  }
}
