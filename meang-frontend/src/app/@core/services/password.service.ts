import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MutationUser,
  ResultUser,
} from '@core/interfaces/results/users.interface';
import {
  CHANGE_PASSWORD,
  RESET_PASSWORD,
} from '@graphql/operations/mutation/password';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PasswordService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public reset(email: string): Observable<ResultUser> {
    return this.set<MutationUser>(RESET_PASSWORD, {
      email,
    }).pipe(map((result) => result.resetPassword));
  }

  public change(token: string, password: string): Observable<ResultUser> {
    const user = JSON.parse(atob(token.split('.')[1])).user;
    return this.set<MutationUser>(
      CHANGE_PASSWORD,
      {
        password,
        id: user.id,
      },
      {
        headers: new HttpHeaders({
          Authorization: token,
        }),
      }
    ).pipe(map((result) => result.changePassword));
  }
}
