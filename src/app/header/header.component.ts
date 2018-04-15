import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userMenus: KFMenu[];
  notifications: KFNotification[];

  constructor(private router: Router) { }

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

  userMenuNavigation(userMenu: KFMenu): void {
    if (userMenu.id === 'profile') {
      this.router.navigate(['/profile']);
    }
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
