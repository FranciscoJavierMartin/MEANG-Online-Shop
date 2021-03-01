import { Component, OnInit } from '@angular/core';
import { faColumns, faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faColumns = faColumns;
  faIdCard = faIdCard;

  constructor() {}

  ngOnInit(): void {}
}
