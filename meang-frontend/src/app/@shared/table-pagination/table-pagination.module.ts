import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TablePaginationComponent } from './table-pagination.component';

@NgModule({
  declarations: [TablePaginationComponent],
  imports: [CommonModule, NgbPaginationModule],
  exports: [TablePaginationComponent],
})
export class TablePaginationModule {}
