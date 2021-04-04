import { Component } from '@angular/core';
import { Tag } from '@core/interfaces/models/tag.interface';
import { IResultData } from '@core/interfaces/results/result-data.interface';
import { ResultTag } from '@core/interfaces/results/tag.interface';
import { ITableColumns } from '@core/interfaces/ui/table-columns.interface';
import { TAG_LIST_QUERY } from '@graphql/operations/query/tag';
import { formBasicDialog, infoDetailsBasic } from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { DocumentNode } from 'graphql';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  readonly query: DocumentNode = TAG_LIST_QUERY;
  readonly context: object = {};
  readonly itemsPage: number = 5;
  resultData: IResultData = {
    listKey: 'tags',
    definitionKey: 'tags',
  };
  readonly include: boolean = true;
  readonly columns: Array<ITableColumns> = [
    {
      property: 'id',
      label: '#',
    },
    {
      property: 'name',
      label: 'Name',
    },
    {
      property: 'slug',
      label: 'Slug',
    },
  ];

  constructor(private tagService: TagsService) {}

  public async addTag(): Promise<void> {
    const html =
      '<input id="name" class="swal2-input" required placeholder="Name">';
    const result = await formBasicDialog('Add tag', html, 'name');
    if (result.value) {
      this.tagService.addTag(result.value || '').subscribe((res: ResultTag) => {
        if (res.status) {
          basicAlert(res.message, TYPE_ALERT.SUCCESS);
        } else {
          basicAlert(res.message, TYPE_ALERT.WARNING);
        }
      });
    }
  }

  public async editTag(tag: Tag): Promise<void> {
    const html = `<input id="name" value="${tag.name}" class="swal2-input" required placeholder="Name">`;
    const result = await formBasicDialog('Update tag', html, 'name');
    if (result.value) {
      this.tagService
        .updateTag(tag.id, result.value || '')
        .subscribe((res: ResultTag) => {
          if (res.status) {
            basicAlert(res.message, TYPE_ALERT.SUCCESS);
          } else {
            basicAlert(res.message, TYPE_ALERT.WARNING);
          }
        });
    }
  }

  public async infoTag(tag: Tag): Promise<void> {
    const result = await infoDetailsBasic(
      `Details ${tag.name}`,
      `${tag.name} (${tag.slug})`,
      375
    );

    if (result) {
      this.editTag(tag);
    } else if (result === false) {
      this.blockTag(tag.id);
    }
  }

  public async blockTag(id: string): Promise<void> {
    const result = await infoDetailsBasic(
      'Block',
      'Do you want to block this tag?',
      375,
      'No',
      'Yes'
    );

    if (result === false) {
      this.tagService.blockTag(id).subscribe((res) => {
        if (res.status) {
          basicAlert(res.message, TYPE_ALERT.SUCCESS);
        } else {
          basicAlert(res.message, TYPE_ALERT.WARNING);
        }
      });
    }
  }
}
