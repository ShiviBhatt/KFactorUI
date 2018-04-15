import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { Chart } from 'chart.js';
import * as io  from 'socket.io-client';
import { Router } from '@angular/router';
import { HomeService } from './homeService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chart: any;
  socket: any;

  @ViewChild('sdChart')
  sdChart: ElementRef;

  constructor(private router: Router, private homeService: HomeService) {
      this.socket = io.connect('http://172.30.0.144:3000');
      this.initWebsocketHandlers();
      this.subscribeUser();
  }

  subscribeUser(): void {
    let addUser = {
        type: "ADD_USER", 
        uid: "1234",
        userName : "shemeem",
        school: "mountdesert",
        grade: "G5"
    };
    this.socket.emit('open', addUser);
  }

  initWebsocketHandlers(): void {
    this.socket.on('message', msg => {
      debugger;
    });
    this.socket.on('error', msg => {
      debugger;
    });
    this.socket.on('close', msg => {
      debugger;
    });
  }

  ngOnInit() {

  }

  goToChallenge(user: string): void {
    this.homeService.user = user;
    this.router.navigate(['/challenges']);
  }

}
