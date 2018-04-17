import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-challenge-complete',
  templateUrl: './challenge-complete.component.html',
  styleUrls: ['./challenge-complete.component.scss']
})
export class ChallengeCompleteComponent implements OnInit {

  wins: any;
  challengeId: any;

  constructor(private socketService: SocketService, private router: Router,
              private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.wins = this.socketService.selfStatus.wins;
    this.route.params.subscribe((params) => {
      this.challengeId = params['challengeId'];
    });
    this.updateLeaderBoard();
  }

  updateLeaderBoard(): void {
    let userInfo = localStorage.getItem('userInfo');
    let id = JSON.parse(userInfo).id;
    this.dataService.putData('leaderboard/'+ id, '')
      .subscribe((res) => {

      });
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }

}
