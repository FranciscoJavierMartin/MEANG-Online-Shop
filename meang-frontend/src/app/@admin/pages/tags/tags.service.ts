import { Injectable } from '@angular/core';
import { MutationTag, ResultTag } from '@core/interfaces/results/tag.interface';
import {
  ADD_TAG,
  BLOCK_TAG,
  UPDATE_TAG,
} from '@graphql/operations/mutation/tag';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  public addTag(name: string): Observable<ResultTag> {
    return this.set<MutationTag>(ADD_TAG, { tag: name }, {}).pipe(
      map((result) => result.addTag)
    );
  }

  public updateTag(id: string, tag: string): Observable<ResultTag> {
    return this.set<MutationTag>(UPDATE_TAG, { id, tag }, {}).pipe(
      map((result) => result.updateTag)
    );
  }

  public blockTag(id: string): Observable<ResultTag> {
    return this.set<MutationTag>(BLOCK_TAG, { id }, {}).pipe(
      map((result) => result.blockTag)
    );
  }
}
