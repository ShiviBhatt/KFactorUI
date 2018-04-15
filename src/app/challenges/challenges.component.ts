import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home/homeService';
import { topics } from './topics';

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
  grades: Array<string>;
  schools: Array<string>;
  topics: Array<string>;
  topRankers: any;
  hideSearch: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.user = this.homeService.user;
    if (this.user) {
      this.hideSearch = true;
    }
    this.selectedGrade = 'ALL';
    this.selectedSchool = 'ALL';
    this.grades = ['ALL', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
    this.schools = ['ALL', 'ABC', 'EFG', 'MNO', 'RST'];
    this.topics = topics.topics;
    this.selectedTopic = this.topics[0];

    this.topRankers = [{"uid": "123", "userName": "Michael", "school": "ABC", "grade": "5", "active": true},
                       {"uid": "456", "userName": "Michael1", "school": "DEF", "grade": "6", "active": false},
                       {"uid": "789", "userName": "Michael2", "school": "GHI", "grade": "7", "active": true}];
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
  }

  schoolChange(event): void {
    this.selectedSchool = event;
  }

  userNameChange(event): void {
    this.userName = event;
  }

  selectOpponent(opponent): void {
    this.user = opponent;
  }

  createChallenge(): void {
    console.log(this.user);
    console.log(this.selectedTopic);
  }
}
