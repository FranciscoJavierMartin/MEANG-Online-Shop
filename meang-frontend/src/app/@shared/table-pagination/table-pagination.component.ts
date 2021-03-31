import { Component, Input, OnInit } from '@angular/core';
import {
  InfoPage,
  IResultData,
} from '@core/interfaces/results/result-data.interface';
import { QueryUsers } from '@core/interfaces/results/users.interface';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablePaginationService } from './table-pagination.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage: number = 20;
  @Input() include: boolean = true;
  @Input() resultData: IResultData;
  infoPage: InfoPage;
  data$: Observable<any>;

  constructor(private tableService: TablePaginationService) {}

  ngOnInit(): void {
    if (this.query) {
      if (this.resultData) {
        this.infoPage = {
          page: 1,
          pages: 1,
          itemsPage: this.itemsPage,
          total: 1,
        };
        this.loadData();
      }
    } else {
      throw new Error('Query is not defined, please add');
    }
  }

  public loadData(): void {
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
    };
    this.data$ = this.tableService
      .getCollectionData(this.query, variables, {})
      .pipe(
        map((result) => {
          const data = result[this.resultData.definitionKey];
          this.infoPage.pages = data.info.pages;
          this.infoPage.total = data.info.total;
          return data[this.resultData.listKey];
        })
      );
  }

  public changePage() :void{
    this.loadData();
  }
}
