import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userMenus: KFMenu[];

  subscription: Subscription;

  notifications: KFNotification[];

  constructor(private router: Router, private socketService: SocketService) {
    this.subscription = this.socketService.getData().subscribe(msg => {
      if (msg.type == 'C_NOTIFY') {
        this.notifications = msg.data;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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
    this.notifications = [];
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
