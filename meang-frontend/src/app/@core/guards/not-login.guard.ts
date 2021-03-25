import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JWToken } from '@core/interfaces/models/token.interface';
import { AuthService } from '@core/services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class NotLoginGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let res: boolean;

    if (this.auth.getSession()) {
      const dataDecoded = this.decodeToken();

      if (dataDecoded.exp < new Date().getTime() / 1000) {
        res = true;
      } else {
        res = false;
      }
    } else {
      res = true;
    }

    return res;
  }

  private decodeToken(): JWToken {
    return jwtDecode<JWToken>(this.auth.getSession().token);
  }
}
