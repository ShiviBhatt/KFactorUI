import { Component, OnInit } from '@angular/core';
import { topics } from '../challenges/topics';

@Component({
    selector: 'user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    user: User;
    topics: Array<Topic> = [];
    selectedTopics: Array<string>;

    ngOnInit(): void {
        this.user = {
            firstName: 'Sam',
            lastName: 'Andrew',
            school: 'ABC',
            grade: '9',
            userName: 'superstar',
            topics: ''
        };

        topics.topics.forEach((topic) => {
            this.topics.push({name: topic, checked: false});
        });
    }

    saveUserDetails(): void {
        console.log(this.user);
    }
    
    selectedOptions(): void {
        this.selectedTopics = this.topics
            .filter(topic => topic.checked)
            .map(topic => topic.name);
        this.user.topics = this.selectedTopics.join(', ');
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