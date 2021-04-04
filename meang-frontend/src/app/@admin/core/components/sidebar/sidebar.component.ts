import { Component, OnInit } from '@angular/core';
import {
  faColumns,
  faIdCard,
  faAtlas,
  faTags,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  readonly faColumns = faColumns;
  readonly faIdCard = faIdCard;
  readonly faAtlas = faAtlas;
  readonly faTags = faTags;

  constructor() {}

  ngOnInit(): void {}
}
