import { Injectable } from '@angular/core';

@Injectable()
export class MockDataService {

  user: KFUser;

  constructor() {
    this.user = {
      uid: '12345',
      userName: 'pinku',
      school: 'Mount Desert High School',
      grade: '5E'
    };
  }

}

export interface KFUser {
  uid: string;
  userName: string;
  school: string;
  grade: string;
}
