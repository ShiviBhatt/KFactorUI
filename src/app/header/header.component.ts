import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userMenus: KFMenu[];
  notifications: KFNotification[];

  constructor() { }

  ngOnInit() {
    this.userMenus = [
      {
        id: 'profile',
        displayName: 'Profile'
      },
      {
        id: 'logout',
        displayName: 'Logout'
      }
    ];
    this.notifications = [
      { id: 'N123', title: 'Chris challenged you for Computer Science', hasRead: false},
      { id: 'N124', title: 'Michel challenged you for General Knoledge', hasRead: false},
      { id: 'N125', title: '<i>Shemeem</i> challenged you for <i>Java</i>', hasRead: false},
      { id: 'N123', title: 'Chris challenged you for Computer Science', hasRead: false},
      { id: 'N124', title: 'Michel challenged you for General Knoledge', hasRead: false},
      { id: 'N125', title: '<i>Shemeem</i> challenged you for <i>Java</i>', hasRead: false},
      { id: 'N123', title: 'Chris challenged you for Computer Science', hasRead: false},
      { id: 'N124', title: 'Michel challenged you for General Knoledge', hasRead: false},
      { id: 'N125', title: '<i>Shemeem</i> challenged you for <i>Java</i>', hasRead: false},
      { id: 'N123', title: 'Chris challenged you for Computer Science', hasRead: false},
      { id: 'N124', title: 'Michel challenged you for General Knoledge', hasRead: false},
      { id: 'N125', title: '<i>Shemeem</i> challenged you for <i>Java</i>', hasRead: false},
      { id: 'N123', title: 'Chris challenged you for Computer Science', hasRead: false},
      { id: 'N124', title: 'Michel challenged you for General Knoledge', hasRead: false},
      { id: 'N125', title: '<i>Shemeem</i> challenged you for <i>Java</i>', hasRead: false}
    ];
  }

  getUnreadNotification(): KFNotification[] {
    return this.notifications.filter((notification) => !notification.hasRead);
  }

  handleNotification(notification: KFNotification): void {
    notification.hasRead = true;
  }

}

export interface KFMenu {
  id: string;
  displayName: string;
}

export interface KFNotification {
  id: string;
  title: string;
  hasRead: boolean;
}
