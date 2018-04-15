import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge-viewer',
  templateUrl: './challenge-viewer.component.html',
  styleUrls: ['./challenge-viewer.component.scss']
})
export class ChallengeViewerComponent implements OnInit {

  challengeId: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.challengeId = params.id;
    });
  }

}
