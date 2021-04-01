import { Component, OnInit } from '@angular/core';
import {
  faColumns,
  faIdCard,
  faAtlas,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faColumns = faColumns;
  faIdCard = faIdCard;
  faAtlas = faAtlas;
  
  constructor() {}

  ngOnInit(): void {}
}
