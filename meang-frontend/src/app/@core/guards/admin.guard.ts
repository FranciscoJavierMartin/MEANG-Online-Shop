import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from '@core/services/auth.service';
import { JWToken } from '@core/interfaces/models/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let res: boolean;

    if (this.auth.getSession()) {
      const dataDecoded = this.decodeToken();

      if (dataDecoded.exp < new Date().getTime() / 1000) {
        res = this.redirectToLogin();
      } else if (dataDecoded.user.role === 'ADMIN') {
        res = true;
      }
    } else {
      res = this.redirectToLogin();
    }

    return res;
  }

  private decodeToken(): JWToken {
    return jwtDecode<JWToken>(this.auth.getSession().token);
  }

  private redirectToLogin(): boolean {
    this.router.navigate(['/login']);
    return false;
  }
}
