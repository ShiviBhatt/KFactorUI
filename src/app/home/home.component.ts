import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './homeService';
import { Subscription } from 'rxjs/Subscription';
import { SocketService } from '../socket.service';
import { topics } from '../challenges/topics';
import { MockDataService } from '../mock-data.service';
import {Http, URLSearchParams, Response} from '@angular/http';
import { DataService } from '../data.service';

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
  loggedInUser: any = { uid: '4354657' };
  userDetails: any;
  userStats: any;
  userExists: boolean;
  addUserData: any;
  updateUserData: any;

  @ViewChild('sdChart')
  sdChart: ElementRef;

  constructor(private router: Router, private homeService: HomeService, private socketService: SocketService,
              private dataService: DataService, private mockDataServie: MockDataService) {
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
    if (localStorage.getItem('uid')) {
      this.topics = topics.topics;
      this.topics.forEach((topic) => {
        this.allTopics.push({'name': topic, checked: false});
      });

    this.activeUsers = [];
      this.getUserDetails();
      this.getTopRankers();
    }
  }

  checkUserExists(): void {
    this.dataService.getData('user/checkExists/'+ localStorage.getItem('uid'))
      .subscribe((userExists) => {
        this.userExists = userExists;
        if (userExists) {
          this.dataService.getData('user/showPopUp/'+ localStorage.getItem('uid'))
            .subscribe((showPopUp) => {
              if (!localStorage.getItem('showModal')) {
                this.showModal = showPopUp;
              } else {
                this.showModal = false;
              }
              localStorage.setItem('showModal', 'false');
              this.getUserStats();
            });
        } else {
          this.showModal = true;
        }
      });
  }

  getUserDetails(): void {
    this.dataService.getData('user/UC/'+ localStorage.getItem('uid'))
      .subscribe((userData) => {
        this.userDetails = userData;
        this.mockDataServie.user.uid = localStorage.getItem('uid');
        this.mockDataServie.user.grade = this.userDetails.gradeLevel;
        this.mockDataServie.user.school = this.userDetails.schoolName;
        this.mockDataServie.user.userName = this.userDetails.firstName;
        console.log(this.mockDataServie);
        this.userDetails.age =  new Date().getFullYear() - new Date(this.userDetails.dateOfBirth).getFullYear();
        this.checkUserExists();
      });
  }

  getUserStats(): void {
    this.dataService.getData('user/'+ localStorage.getItem('uid'))
      .subscribe((res) => {
        if (res.id) {
          localStorage.setItem('userInfo', JSON.stringify(res));
          this.dataService.getData('userStats/'+ res.id)
            .subscribe((userStats) => {
              this.userStats = userStats;
              this.userStats.topics = this.userStats.topics_int.split(',');
              this.userStats.successRate = userStats.win > 0 ? Math.ceil(Number(userStats.win / userStats.participated) * 100) : 0;
            });
        }
      });
  }

  getTopRankers(): void {
    this.dataService.getData('leaderboardByScores')
    .subscribe((res) => {
      if (res!.length <= 5) {
        this.topRankers = res;
      } else {
        this.topRankers = res.slice(0, 5);
      }
    });
  }

  goToChallenge(user: string): void {
    this.homeService.user = user;
    this.router.navigate(['/challenges']);
  }

  selectedTopics(): void {
    this.interestedTopics = this.allTopics
    .filter(topic => topic.checked)
    .map(topic => topic.name);
  }

  closeModal(): void {
    this.doNotShowAgain = true;
    if (!this.userExists) {
      this.addUser();
    } else {
      this.updateUser();
    }
    this.showModal = false;
  }

  skipTopics(): void {
    if (!this.userExists) {
      this.addUser();
    }
    this.showModal = false;
  }

  addUser(): void {
    this.addUserData = {
      'user_src_id': localStorage.getItem('uid'),
      'source': 'uc',
      'user_name': this.userDetails.userName,
      'grade_level': this.userDetails.gradeLevel,
      'grade_name': 'Grade ' + this.userDetails.gradeLevel,
      'school_name': this.userDetails.schoolName,
      'age': this.userDetails.age,
      'gender': '',
      'dob': this.userDetails.dateOfBirth,
      'topics_int': this.interestedTopics.join(', '),
      'show_flag': this.doNotShowAgain ? 1 : 0
    };
    this.dataService.postData('user', this.addUserData)
      .subscribe((res) => {

      });
  }

  updateUser(): void {
    this.updateUserData = {
      'user_name': this.userDetails.userName,
      'show_flag': 1,
      'topics_int': this.interestedTopics.join(', ')
    };
    this.dataService.putData('user/'+ localStorage.getItem('uid'), this.updateUserData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
