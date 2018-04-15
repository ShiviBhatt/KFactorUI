import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { Chart } from 'chart.js';
import * as io  from 'socket.io-client';

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

  constructor() {
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
    // let ctx = this.sdChart.nativeElement.getContext('2d');
    // this.chart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //       datasets: [{
    //           label: '# of Votes',
    //           data: [12, 19, 3, 5, 2, 3],
    //           backgroundColor: [
    //               'rgba(255, 99, 132, 0.2)',
    //               'rgba(54, 162, 235, 0.2)',
    //               'rgba(255, 206, 86, 0.2)',
    //               'rgba(75, 192, 192, 0.2)',
    //               'rgba(153, 102, 255, 0.2)',
    //               'rgba(255, 159, 64, 0.2)'
    //           ],
    //           borderColor: [
    //               'rgba(255,99,132,1)',
    //               'rgba(54, 162, 235, 1)',
    //               'rgba(255, 206, 86, 1)',
    //               'rgba(75, 192, 192, 1)',
    //               'rgba(153, 102, 255, 1)',
    //               'rgba(255, 159, 64, 1)'
    //           ],
    //           borderWidth: 1
    //       }]
    //   },
    //   options: {
    //       scales: {
    //           yAxes: [{
    //               ticks: {
    //                   beginAtZero:true
    //               }
    //           }]
    //       }
    //   }
    // });
  }

}
