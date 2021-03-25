import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerLegalAgeComponent } from './date-picker-legal-age.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DatePickerLegalAgeComponent],
  imports: [CommonModule, NgbDatepickerModule, FormsModule, FontAwesomeModule],
  exports: [DatePickerLegalAgeComponent],
})
export class DatePickerLegalAgeModule {}
