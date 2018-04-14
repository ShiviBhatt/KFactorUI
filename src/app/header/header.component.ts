import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  kFactor: KFactor;

  userMenus: KFMenu[];

  constructor() { }

  ngOnInit() {
    this.kFactor = {
      logoName: 'K? Factor'
    };
    this.userMenus = [
      {
        id: 'profile',
        displayName: 'Profile'
      },
      {
        id: 'settings',
        displayName: 'Settings'
      },
      {
        id: 'logout',
        displayName: 'Logout'
      }
    ]
  }

}

export interface KFactor {
  logoName: string;
}

export interface KFMenu {
  id: string;
  displayName: string;
}
