import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge-complete',
  templateUrl: './challenge-complete.component.html',
  styleUrls: ['./challenge-complete.component.scss']
})
export class ChallengeCompleteComponent implements OnInit {

  wins: any;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    this.wins = this.socketService.selfStatus.wins;
    //this.wins = true;
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 3000);
  }

}
