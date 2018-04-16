import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {

  socket: any;

  ctMap: any;

  otherUser: any;

  selfStatus: any;
  userUid: string;

  subject = new Subject<any>();

  constructor() {
    this.ctMap = {

    };
    this.otherUser = {

    }
    this.selfStatus = {
      
    }
  }

  sendData(data: any) {
    this.subject.next(data)
  }

  clearData() {
      this.subject.next();
  }

  getData(): Observable<any> {
      return this.subject.asObservable();
  }

}
