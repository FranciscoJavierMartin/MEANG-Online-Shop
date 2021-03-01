import { Component, Output, EventEmitter } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggledValue: boolean = true;
  faBars = faBars;
  @Output() toggleChange = new EventEmitter<boolean>();

  constructor() {}

  toggled() {
    this.toggledValue = !this.toggledValue;
    this.toggleChange.emit(this.toggledValue);
  }
}
