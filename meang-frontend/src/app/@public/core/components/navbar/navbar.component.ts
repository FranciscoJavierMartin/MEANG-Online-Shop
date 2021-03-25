import { Component, OnInit } from '@angular/core';
import { ResultMe } from '@core/interfaces/results/me.interface';
import { AuthService } from '@core/services/auth.service';
import {
  faSignOutAlt,
  faUserAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  faCog = faCog;
  session: ResultMe = {
    status: false,
    message: '',
  };
  access: boolean = false;
  role: string;
  userLabel: string = '';

  constructor(private authService: AuthService) {
    this.authService.accessVar$.subscribe((result: ResultMe) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${this.session.user?.name} ${this.session.user?.lastname}`;
    });
  }

  public logout() {
    this.authService.resetSession();
  }
}
