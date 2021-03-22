import { Injectable } from '@angular/core';
import { USERS_LIST_QUERY } from '@graphql/operations/quey/user';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public getUsers() {
    return this.get(USERS_LIST_QUERY, {
      include: true,
    }).pipe(map((result: any) => result.users));
  }
}
