import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  protected get<T>(
    query: DocumentNode,
    variables: object = {},
    context: object = {}
  ) {
    return this.apollo
      .watchQuery<T>({
        query,
        variables,
        context,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data;
        })
      );
  }
}
