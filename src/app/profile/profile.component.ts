import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    user: User;
    topics: Array<Topic>;
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

        this.topics = [
            {name:'Computer Science', value:'Computer Science', checked:false},
            {name:'General Knowledge', value:'General Knowledge', checked:false},
            {name:'Science', value:'Science', checked:false},
            {name:'History', value:'History', checked:false},
            {name:'Music', value:'Music', checked:false},
            {name:'Hollywood', value:'Hollywood', checked:false},
            {name:'Sports', value:'Sports', checked:false}
        ];
    }

    saveUserDetails(): void {
        console.log(this.user);
    }
    
    selectedOptions(): void {
        this.selectedTopics = this.topics
            .filter(topic => topic.checked)
            .map(topic => topic.value);
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
    value: string;
    checked: boolean;
}