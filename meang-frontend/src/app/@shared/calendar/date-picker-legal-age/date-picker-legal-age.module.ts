import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerLegalAgeComponent } from './date-picker-legal-age.component';

@NgModule({
  declarations: [DatePickerLegalAgeComponent],
  imports: [CommonModule, NgbDatepickerModule],
})
export class DatePickerLegalAgeModule {}
