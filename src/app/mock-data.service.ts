import { Injectable } from '@angular/core';

@Injectable()
export class MockDataService {

  user: KFUser;

  constructor() {
    this.user = {
      uid: '11E8325A-E87A-BDE3-8FD9-010011AC0000',
      userName: 'Arthur',
      school: 'Arkham Asylum',
      grade: '7'
    };
  }

}

export interface KFUser {
  uid: string;
  userName: string;
  school: string;
  grade: string;
}
