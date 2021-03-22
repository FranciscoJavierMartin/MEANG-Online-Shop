import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/quey/user';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public login(email: string, password: string) {
    return this.get(LOGIN_QUERY, { email, password }).pipe(
      map((result: any) => result.login)
    );
  }

  public getMe() {
    return this.get(
      ME_DATA_QUERY,
      { include: false },
      {
        headers: new HttpHeaders({
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwNTMxOTllOGI3MzQ3NWMxMGJlYjljYiIsIm5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsInJvbGUiOiJBRE1JTiJ9LCJpYXQiOjE2MTY0NDM2MDMsImV4cCI6MTYxNzA0ODQwM30.12_WkxeeLLb4l8hg7mZg3XIjaHMkYOzRIlZwNK3Zy38',
        }),
      }
    ).pipe(map((result: any) => result.me));
  }
}
