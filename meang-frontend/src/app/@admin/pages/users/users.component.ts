import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/results/result-data.interface';
import { ITableColumns } from '@core/interfaces/ui/table-columns.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { DocumentNode } from 'graphql';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
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
      property: 'lastname',
      label: 'Lastname',
    },
    {
      property: 'email',
      label: 'Email',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
  }
}
