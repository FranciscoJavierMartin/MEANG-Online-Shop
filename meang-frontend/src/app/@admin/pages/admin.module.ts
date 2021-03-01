import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { TitleComponent } from '../core/components/title/title.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    TitleComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FontAwesomeModule],
})
export class AdminModule {}
