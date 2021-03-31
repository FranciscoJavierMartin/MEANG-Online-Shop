import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { RegisterData } from '@core/interfaces/forms/register.interface';
import { QueryUsers } from '@core/interfaces/results/users.interface';
import { REGISTER_USER } from '@graphql/operations/mutation/user';
import { USERS_LIST_QUERY } from '@graphql/operations/quey/user';
import { ApiService } from '@graphql/services/api.service';
import {
  MutationRegister,
  ResultRegister,
} from '@core/interfaces/results/register.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getUsers(page: number = 1, itemsPage: number = 20) {
    return this.get<QueryUsers>(USERS_LIST_QUERY, {
      include: true,
      page,
      itemsPage,
    }).pipe(map((result: QueryUsers) => result.users));
  }

  public register(user: RegisterData): Observable<ResultRegister> {
    return this.set<MutationRegister>(REGISTER_USER, {
      user,
      include: false,
    }).pipe(
      map((result) => {
        return result.register;
      })
    );
  }
}
