import { Component, OnInit } from '@angular/core';
import { topics } from '../challenges/topics';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    user: User;
    topics: Array<Topic> = [];
    interestedTopics: any;
    userDetails: any;
    selectedTopics: any;
    updateUserData: any;
    userData: any;

    constructor (private dataService: DataService, private router: Router) {}

    ngOnInit(): void {
        this.getUserDetails();
    }

    getUserDetails(): void {
        this.dataService.getData('user/UC/'+ localStorage.getItem('uid'))
          .subscribe((userData) => {
            this.userDetails = userData;
            this.dataService.getData('user/'+ localStorage.getItem('uid'))
                .subscribe((res) => {
                    if (res.id) {
                    this.userData = res;
                    this.dataService.getData('userStats/'+ res.id)
                        .subscribe((userStats) => {
                            this.interestedTopics = userStats.topics_int;
                            let topicArr = this.interestedTopics.split(',');
                            topicArr = topicArr.map(topic => topic.trim());
                            topics.topics.forEach((topic) => {
                                let checked = topicArr.indexOf(topic.trim()) >= 0;
                                this.topics.push({name: topic, checked: checked});
                            });
                        });
                    }
            });
          });
    }

    saveUserDetails(): void {
        this.updateUserData = {
            'user_name': this.userData.user_name,
            'show_flag': this.selectedTopics.length > 0 ? 0 : this.userData.show_flag,
            'topics_int': this.selectedTopics.join(', ')
          };
          this.dataService.putData('user/'+ localStorage.getItem('uid'), this.updateUserData)
            .subscribe((res) => {
              if (res === 1) {
                this.interestedTopics = this.selectedTopics.join(', ');
                this.router.navigate(['/home']);
              }
            });
    }
    
    selectedOptions(): void {
        this.selectedTopics = this.topics
            .filter(topic => topic.checked)
            .map(topic => topic.name);
    }
}

export interface User {
    firstName: string;
    lastName: string;
    school: string;
    grade: string;
    userName: string;
    topics: string;
}

export interface Topic {
    name: string;
    checked: boolean;
}