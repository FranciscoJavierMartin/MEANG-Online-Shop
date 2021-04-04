import { Injectable } from '@angular/core';
import {
  RegisterData,
  UpdateData,
} from '@core/interfaces/forms/register.interface';
import { ResultRegister } from '@core/interfaces/results/register.interface';
import { Result } from '@core/interfaces/results/result.interface';
import {
  MutationUser,
  ResultUser,
} from '@core/interfaces/results/users.interface';
import { UsersService } from '@core/services/users.service';
import { UPDATE_USER } from '@graphql/operations/mutation/user';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersAdminService extends ApiService {
  constructor(private usersSertvice: UsersService, apollo: Apollo) {
    super(apollo);
  }

  register(user: RegisterData): Observable<ResultRegister> {
    return this.usersSertvice.register(user);
  }

  update(user: UpdateData): Observable<ResultUser> {
    return this.set<MutationUser>(
      UPDATE_USER,
      { user, include: false },
      {}
    ).pipe(map((result) => result.updateUser));
  }
}
