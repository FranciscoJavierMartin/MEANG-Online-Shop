import { Injectable } from '@angular/core';
import {
  MutationGenre,
  ResultGenre,
} from '@core/interfaces/results/genre.interface';
import { ADD_GENRE, UPDATE_GENRE } from '@graphql/operations/mutation/genre';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenresService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public addGenre(name: string): Observable<ResultGenre> {
    return this.set<MutationGenre>(ADD_GENRE, { genre: name }, {}).pipe(
      map((result) => result.addGenre)
    );
  }

  public updateGenre(id: string, genre: string): Observable<ResultGenre> {
    return this.set<MutationGenre>(UPDATE_GENRE, { id, genre }, {}).pipe(
      map((result) => result.updateGenre)
    );
  }
}
