import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss'],
})
export class DatePickerLegalAgeComponent {
  readonly faCalendar = faCalendar;
  selectedDate: NgbDateStruct;
  readonly currentDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  readonly minDate: NgbDateStruct = {
    ...this.currentDate,
    year: this.currentDate.year - 100,
  };
  readonly maxDate: NgbDateStruct = {
    ...this.currentDate,
    year: this.currentDate.year - 18,
  };
  @Output() dateChanged = new EventEmitter<NgbDateStruct>();

  constructor() {}

  selectDateChange(): void {
    this.dateChanged.emit(this.selectedDate);
  }
}
