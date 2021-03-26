import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  protected get<T>(
    query: DocumentNode,
    variables: object = {},
    context: object = {}
  ): Observable<T> {
    return this.apollo
      .watchQuery<T>({
        query,
        variables,
        context,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map((result) => result.data));
  }

  protected set<T>(
    mutation: DocumentNode,
    variables: object = {},
    context: object = {}
  ): Observable<T> {
    return this.apollo
      .mutate<T>({
        mutation,
        variables,
        context,
      })
      .pipe(map((result) => result.data));
  }
}
