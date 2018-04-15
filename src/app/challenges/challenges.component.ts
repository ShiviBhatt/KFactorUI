import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/homeService';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  user: string;
  selectedTopic: string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.user = this.homeService.user;
    this.selectedTopic = 'History';
  }

  topicChange(event): void {
    this.selectedTopic = event;
  }

  createChallenge(): void {
    console.log(this.user);
    console.log(this.selectedTopic);
  }
}
