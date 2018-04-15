import { Component, Output, EventEmitter } from '@angular/core';
import * as io  from 'socket.io-client';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'app';
  socket: any;
  
  constructor(private socketService: SocketService) {
    this.socket = io.connect('http://172.30.0.144:3000');
    this.initWebsocketHandlers();
    this.subscribeUser();
  }

  subscribeUser(): void {
    let addUser = {
        type: "ADD_USER", 
        uid: "4354657",
        userName : "Anv akjlkjadf kadf",
        school: "Fermington",
        grade: "G5"
    };
    this.socket.emit('open', addUser);
  }

  initWebsocketHandlers(): void {
    
    this.socket.on('connect', msg => {
        
    });

    this.socket.on('message', msg => {
      this.socketService.sendData(msg);
    });

    this.socket.on('error', msg => {
      
    });

    this.socket.on('disconnect', msg => {
      
    });

  }
}
