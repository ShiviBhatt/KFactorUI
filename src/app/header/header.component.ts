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
        this.notifications = this.buildNotification(msg.data);
      }
    });
  }

  buildNotification(notificationData: Array<any>): Array<any> {
    let notifications = [];
    for (let i = 0; i < notificationData.length; i++) {
      notifications.push({
        id: notificationData[i].challengeId,
        title: notificationData[i].challengedBy.userName + ' challenged you on ' + notificationData[i].topic
      });
      this.socketService.ctMap[notificationData[i].challengeId] = notificationData[i].topic;
      this.socketService.otherUser.uid = notificationData[i].challengedBy.uid;
      this.socketService.otherUser.userName = notificationData[i].challengedBy.userName;
    }
    return notifications;
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
