import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './homeService';
import { Subscription } from 'rxjs/Subscription';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chart: any;
  socket: any;
  subscription: Subscription

  @ViewChild('sdChart')
  sdChart: ElementRef;

  constructor(private router: Router, private homeService: HomeService, private socketService: SocketService) {
    this.subscription = this.socketService.getData().subscribe(msg => {
        if (msg.type == 'C_NOTIFY') {
            
        }
    });
  }

  ngOnInit() {

  }

  goToChallenge(user: string): void {
    this.homeService.user = user;
    this.router.navigate(['/challenges']);
  }

}
