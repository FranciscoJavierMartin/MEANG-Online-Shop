import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationModule } from '@shared/table-pagination/table-pagination.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TablePaginationModule,
  ]
})
export class UsersModule { }
