import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faPlusCircle,
  faInfo,
  faEdit,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import {
  InfoPage,
  IResultData,
} from '@core/interfaces/results/result-data.interface';
import { ITableColumns } from '@core/interfaces/ui/table-columns.interface';
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
  @Input() tableColumns: Array<ITableColumns>;
  @Output() addItem: EventEmitter<void> = new EventEmitter<void>();
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() infoItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() blockItem: EventEmitter<string> = new EventEmitter<string>();
  infoPage: InfoPage;
  data$: Observable<any>;
  readonly faPlusCircle = faPlusCircle;
  readonly faInfo = faInfo;
  readonly faEdit = faEdit;
  readonly faLock = faLock;

  constructor(private tableService: TablePaginationService) {}

  ngOnInit(): void {
    if (!this.query) {
      throw new Error('Query is not defined, please add');
    } else if (!this.resultData) {
      throw new Error('Result data is not defined, please add');
    } else if (!this.tableColumns) {
      throw new Error('Table columns is not defined, please add');
    } else {
      if (this.resultData) {
        this.infoPage = {
          page: 1,
          pages: 1,
          itemsPage: this.itemsPage,
          total: 1,
        };
        this.loadData();
      }
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

  public changePage(): void {
    this.loadData();
  }

  public addItemHandler(): void {
    this.addItem.emit();
  }

  public editItemHandler(data: any): void {
    this.editItem.emit(data);
  }

  public infoItemHandler(data: any): void {
    this.infoItem.emit(data);
  }

  public blockItemHandler(id: string): void {
    this.blockItem.emit(id);
  }
}
