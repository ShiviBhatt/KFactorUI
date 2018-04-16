import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  leaderByWins: Array<any> = [];
  leaderByScores: Array<any> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLeaderByWins();
    this.getLeaderByScores();
  }

  getLeaderByWins(): void {
    this.dataService.getData('leaderboardByWins')
      .subscribe((res) => {
        this.leaderByWins = res;
      });
  }

  getLeaderByScores(): void {
    this.dataService.getData('leaderboardByScores')
      .subscribe((res) => {
        this.leaderByScores = res;
      });
  }

}
