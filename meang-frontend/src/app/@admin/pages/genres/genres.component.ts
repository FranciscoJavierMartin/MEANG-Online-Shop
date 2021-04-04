import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/results/result-data.interface';
import { ITableColumns } from '@core/interfaces/ui/table-columns.interface';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { formBasicDialog, infoDetailsBasic } from '@shared/alerts/alerts';
import { GenresService } from './genres.service';
import { ResultGenre } from '@core/interfaces/results/genre.interface';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Genre } from '@core/interfaces/models/genre.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  readonly query: DocumentNode = GENRE_LIST_QUERY;
  readonly context: object = {};
  readonly itemsPage: number = 5;
  resultData: IResultData = {
    listKey: 'genres',
    definitionKey: 'genres',
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

  constructor(private genreService: GenresService) {}

  ngOnInit(): void {}

  public async addGenre(): Promise<void> {
    const html =
      '<input id="name" class="swal2-input" required placeholder="Name">';
    const result = await formBasicDialog('Add genre', html, 'name');
    if (result.value) {
      this.genreService
        .addGenre(result.value || '')
        .subscribe((res: ResultGenre) => {
          if (res.status) {
            basicAlert(res.message, TYPE_ALERT.SUCCESS);
          } else {
            basicAlert(res.message, TYPE_ALERT.WARNING);
          }
        });
    }
  }

  public async editGenre(genre: Genre): Promise<void> {
    const html = `<input id="name" value="${genre.name}" class="swal2-input" required placeholder="Name">`;
    const result = await formBasicDialog('Update genre', html, 'name');
    if (result.value) {
      this.genreService
        .updateGenre(genre.id, result.value || '')
        .subscribe((res: ResultGenre) => {
          if (res.status) {
            basicAlert(res.message, TYPE_ALERT.SUCCESS);
          } else {
            basicAlert(res.message, TYPE_ALERT.WARNING);
          }
        });
    }
  }

  public async infoGenre(genre: Genre): Promise<void> {
    const result = await infoDetailsBasic(
      `Details ${genre.name}`,
      `${genre.name} (${genre.slug})`,
      375
    );

    if (result) {
      this.editGenre(genre);
    } else if (result === false) {
      this.blockGenre(genre.id);
    }
  }

  public async blockGenre(id: string): Promise<void> {
    const result = await infoDetailsBasic(
      'Block',
      'Do you want to block this genre?',
      375,
      'No',
      'Yes'
    );

    if (result === false) {
      this.genreService.block(id).subscribe((res) => {
        if (res.status) {
          basicAlert(res.message, TYPE_ALERT.SUCCESS);
        } else {
          basicAlert(res.message, TYPE_ALERT.WARNING);
        }
      });
    }
  }
}
