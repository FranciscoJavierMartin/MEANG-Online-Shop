import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_SESSION } from '@core/constants/localStorage';
import { Session } from '@core/interfaces/models/session.interface';
import {
  QueryLogin,
  ResultLogin,
} from '@core/interfaces/results/login.interface';
import { QueryMe, ResultMe } from '@core/interfaces/results/me.interface';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/quey/user';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  accessVar = new Subject<ResultMe>();
  accessVar$ = this.accessVar.asObservable();

  constructor(apollo: Apollo) {
    super(apollo);
  }

  public start() {
    if (this.getSession()) {
      this.getMe().subscribe((result: ResultMe) => {
        if (!result.status) {
          this.resetSession();
        } else {
          this.updateSession(result);
        }
      });
    } else {
      this.updateSession({
        status: false,
        message: '',
      });
    }
  }

  public login(email: string, password: string): Observable<ResultLogin> {
    return this.get<QueryLogin>(LOGIN_QUERY, {
      email,
      password,
      include: false,
    }).pipe(map((result: QueryLogin) => result.login));
  }

  public getMe(): Observable<ResultMe> {
    const token = this.getSession()?.token || '';
    return this.get<QueryMe>(
      ME_DATA_QUERY,
      { include: false },
      {
        headers: new HttpHeaders({
          Authorization: token,
        }),
      }
    ).pipe(map((result: QueryMe) => result.me));
  }

  public setSession(token: string, expiresTimeInHours: number = 24): void {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);
    const session: Session = { expiresIn: new Date(date).toISOString(), token };
    localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(session));
  }

  public getSession(): Session {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION));
  }

  public updateSession(newValue: ResultMe) {
    this.accessVar.next(newValue);
  }

  public resetSession(): void {
    localStorage.removeItem(LOCAL_STORAGE_SESSION);
    this.updateSession({ status: false, message: '' });
  }
}
