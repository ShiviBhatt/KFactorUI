import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home/homeService';
import { topics } from './topics';
import { SocketService } from '../socket.service';
import { MockDataService } from '../mock-data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit, OnDestroy {

  user: any;
  selectedTopic: string;
  userName: string;
  selectedGrade: string;
  selectedSchool: string;
  grades: Array<string> = [];
  schools: Array<string> = [];
  topics: Array<string>;
  allUsers: any;
  hideSearch: boolean = false;

  constructor(private homeService: HomeService, private socketService: SocketService,
              private dataService: DataService, private mockDataService: MockDataService) { }

  ngOnInit() {
    this.user = this.homeService.user;
    if (this.user) {
      this.hideSearch = true;
    }

    this.getUsers();
  }

  getUsers(): void {
    this.dataService.getData('user').subscribe(res => {
      this.allUsers = res;
      this.allUsers.forEach((user) => {
        this.grades.push(user.grade_name);
        this.schools.push(user.school_name);
      });
      this.grades = this.grades.filter((value, index, self) => self.indexOf(value) === index);
      this.schools = this.schools.filter((value, index, self) => self.indexOf(value) === index);
      this.grades.sort();
      this.schools.sort();
      this.grades.unshift('ALL');
      this.schools.unshift('ALL');
      this.selectedGrade = this.grades[0];
      this.selectedSchool = this.schools[0];
    });
  }

  ngOnDestroy() {
    this.homeService.user = '';
    this.user = '';
  }

  topicChange(event): void {
    this.selectedTopic = event;
  }

  gradeChange(event): void {
    this.selectedGrade = event;
    this.searchOpponents();
  }

  schoolChange(event): void {
    this.selectedSchool = event;
    this.searchOpponents();
  }

  userNameChange(event): void {
    this.userName = event;
    this.searchOpponents();
  }

  searchOpponents(): void {
    let userName;
    if (!this.userName || this.userName.trim() === '') {
      userName = 'ALL';
    } else {
      userName = this.userName;
    }
    this.dataService.getData('user/filters/' + this.selectedGrade + '/' + this.selectedSchool + '/' + userName)
      .subscribe((res) => {
        this.allUsers = res;
      });
  }

  selectOpponent(opponent): void {
    this.user = opponent;
  }

  createChallenge(): void {
    let challenge = {
      type: 'C_REQ',
      uid: this.mockDataService.user.uid,
      opponentuid: this.user.uid,
      topic: this.selectedTopic,
      userName: this.mockDataService.user.userName,
      opponentName: this.user.userName,
      is_live: true
    };
    this.socketService.otherUser.uid = this.user.uid;
    this.socketService.otherUser.userName = this.user.userName;
    this.socketService.socket.emit('message', challenge);
  }
}
