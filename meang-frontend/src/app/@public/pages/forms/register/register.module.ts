import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerLegalAgeModule } from '@shared/calendar/date-picker-legal-age/date-picker-legal-age.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule,
    DatePickerLegalAgeModule,
  ],
})
export class RegisterModule {}
