import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    ngOnInit(): void {
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('showModal');
    }
}