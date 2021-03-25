import { Component, OnInit } from '@angular/core';
import {
  faSignOutAlt,
  faUserAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  faCog = faCog;

  constructor() {}

  ngOnInit(): void {}
}
