import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {

  socket: any;

  subject = new Subject<any>();

  constructor() { }

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
