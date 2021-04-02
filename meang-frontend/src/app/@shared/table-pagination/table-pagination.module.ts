import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TablePaginationComponent } from './table-pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TablePaginationComponent],
  imports: [CommonModule, NgbPaginationModule, FontAwesomeModule],
  exports: [TablePaginationComponent],
})
export class TablePaginationModule {}
