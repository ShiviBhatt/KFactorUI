import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './homeService';
import { Subscription } from 'rxjs/Subscription';
import { SocketService } from '../socket.service';
import { topics } from '../challenges/topics';
import { MockDataService } from '../mock-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chart: any;
  socket: any;
  subscription: Subscription;
  topRankers: any;
  activeUsers: any;
  topics: Array<string>;
  interestedTopics: any = [];
  showModal: boolean = false;
  allTopics: any = [];
  doNotShowAgain: boolean = false;

  @ViewChild('sdChart')
  sdChart: ElementRef;

  constructor(private router: Router, private homeService: HomeService, private socketService: SocketService, private mockDataServie: MockDataService) {
    this.subscription = this.socketService.getData().subscribe(msg => {
        if (msg.type == 'ACTIVE_USERS') {
            this.activeUsers = this.getOtherActiveUsers(msg.data);
        }
    });
  }

  getOtherActiveUsers(allActiveUser: Array<any>): Array<any> {
    return allActiveUser.filter(activeUser => activeUser.uid != this.mockDataServie.user.uid);
  }

  ngOnInit() {
    this.topRankers = [{"uid": "123", "userName": "Michael", "school": "ABC", "grade": "5", "active": true},
                       {"uid": "456", "userName": "Michael1", "school": "DEF", "grade": "6", "active": false},
                       {"uid": "789", "userName": "Michael2", "school": "GHI", "grade": "7", "active": true}];

    this.activeUsers = [];

    this.topics = topics.topics;
    this.topics.forEach((topic) => {
      this.allTopics.push({"name": topic, checked: false});
    });
    this.showModal = true;
  }

  goToChallenge(user: string): void {
    this.homeService.user = user;
    this.router.navigate(['/challenges']);
  }

  selectedTopics(): void {
    this.interestedTopics = this.allTopics
    .filter(topic => topic.checked)
    .map(topic => topic.name);
    console.log(this.interestedTopics);
    console.log(this.doNotShowAgain);
  }

  closeModal(): void {
    this.showModal = false;
  }

  skipTopics(): void {
    this.showModal = false;
  }

}
