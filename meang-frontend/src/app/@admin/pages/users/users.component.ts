import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/results/result-data.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/quey/user';
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

  constructor() {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 1;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
  }
}
