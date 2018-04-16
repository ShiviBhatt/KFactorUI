import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-challenge-viewer',
  templateUrl: './challenge-viewer.component.html',
  styleUrls: ['./challenge-viewer.component.scss']
})
export class ChallengeViewerComponent implements OnInit {

  challengeId: string;

  constructor(private activatedRoute: ActivatedRoute, private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.challengeId = params.id;
    });
  }

  acceptChallenge() {
    let ucResp = {
      type: 'C_RESP',
      challengeId: this.challengeId,
      accepted: true
    };
    this.router.navigate(['/challenges/' + this.challengeId + '/start']);
    this.socketService.socket.emit('message', ucResp);
  }

}
