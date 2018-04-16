import { Component, Output, EventEmitter } from '@angular/core';
import * as io  from 'socket.io-client';
import { SocketService } from './socket.service';
import { MockDataService } from './mock-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'app';
  socket: any;
  navigated: boolean = false;
  
  constructor(private socketService: SocketService, private mockDataService: MockDataService, private router: Router) {
    this.socket = io.connect('http://172.30.0.144:3000');
    this.socketService.socket = this.socket;
    this.initWebsocketHandlers();
    this.subscribeUser();
  }

  subscribeUser(): void {
    let subscribeRequest = {
        type: "ADD_USER", 
        uid: this.mockDataService.user.uid,
        userName : this.mockDataService.user.userName,
        school: this.mockDataService.user.school,
        grade: this.mockDataService.user.grade
    };
    this.socket.emit('open', subscribeRequest);
  }

  initWebsocketHandlers(): void {
    
    this.socket.on('connect', msg => {
        
    });

    this.socket.on('message', msg => {
      if (msg.type == 'Q_RESP' && !this.navigated) {
        this.router.navigate(['/challenges/' + msg.data[0].question.challengeId + '/start']).then(() => {
          this.socketService.sendData(msg);
          this.navigated = true;
        });
      }
      this.socketService.sendData(msg);
    });

    this.socket.on('error', msg => {
      
    });

    this.socket.on('disconnect', msg => {
      
    });

  }
}
