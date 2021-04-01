import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/results/result-data.interface';
import { ITableColumns } from '@core/interfaces/ui/table-columns.interface';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode = GENRE_LIST_QUERY;
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

  constructor() {}

  ngOnInit(): void {}
}
