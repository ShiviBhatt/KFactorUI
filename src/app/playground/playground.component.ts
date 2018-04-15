import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

const questions: KFQuestion[] = [
  { id: 'Q1', description: 'Which one is a computer input device?', options: [
    { id: 'OP1', value: 'Mouse' },
    { id: 'OP2', value: 'Keyboard' },
    { id: 'OP3', value: 'Mouse' },
    { id: 'OP4', value: 'Mouse' }
  ] },
  { id: 'Q2', description: 'Which one is a computer virus?', options: [
    { id: 'OP1', value: 'PPLO' },
    { id: 'OP2', value: 'Wanna Cry' },
    { id: 'OP3', value: 'HIV' },
    { id: 'OP4', value: 'TMV' }
  ] },
  { id: 'Q3', description: 'What is full form of CPU?', options: [
    { id: 'OP1', value: 'Central Processing Unique' },
    { id: 'OP2', value: 'Central Processing Unit' },
    { id: 'OP3', value: 'Central Package Unit' },
    { id: 'OP4', value: 'Computer Package Utility' }
  ] },
  { id: 'Q4', description: 'Which is a true OOPs computer language?', options: [
    { id: 'OP1', value: 'Javascript' },
    { id: 'OP2', value: 'Java' },
    { id: 'OP3', value: 'C++' },
    { id: 'OP4', value: 'C' }
  ] },
  { id: 'Q4', description: 'Which one is a computer input device?', options: [
    { id: 'OP1', value: 'Mouse' },
    { id: 'OP2', value: 'Keyboard' },
    { id: 'OP3', value: 'Mouse' },
    { id: 'OP4', value: 'Mouse' }
  ] },
];

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  currentQuestion: KFQuestion;
  selectedOption: KFOption;
  remainingTime: number;
  restUrls: any;
  selfScoreBoard: KFScoreBoard;
  opponentScoreBoard: KFScoreBoard;
  timer: any;

  constructor(private dataService: DataService) {
    this.restUrls = dataService.getRestUrls();
  }

  chooseOption(option: KFOption): void {
    option.isLocked = true;
    this.selectedOption = option;
    this.verifyAnswer();
  }

  startCountDown(onTimeup: Function):  any {
    this.remainingTime = 10; 
    let timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime == 0) {
        onTimeup();
        clearInterval(timer);
      }
    }, 1000);
    return timer;
  }

  getQuestion(): KFQuestion {
    return questions.pop();
  }

  ngOnInit() {
    //this.dataService.getData(this.restUrls.getUserDetails);
    this.opponentScoreBoard = {
      totalScore: 0,
      username: 'Michel'
    };
    this.selfScoreBoard = {
      totalScore: 0,
      username: 'Sam'
    }
    this.executeChallenge();
  }

  executeChallenge() {
    this.currentQuestion = this.getQuestion();
    this.timer = this.startCountDown(() => {
      let nextQuestion = this.getQuestion();
      if (nextQuestion) {
        this.executeChallenge();
      }
    });
  }

  calulateCurrentScore(remainingTime): number {
    return remainingTime;
  }

  verifyAnswer(): void {
    setTimeout(() => {
      this.selectedOption.isLocked = false;
      this.selectedOption.isCorrect = true;
      clearInterval(this.timer);
      this.opponentScoreBoard.totalScore = 0;
      this.selfScoreBoard.totalScore += this.calulateCurrentScore(this.remainingTime);
      this.executeChallenge();
    }, 1000);
  }

}

export interface KFQuestion {
  id: string;
  description: string;
  options: KFOption[];
  isCorrect?: boolean;
}

export interface KFOption {
  id: string;
  value: string;
  isLocked?: boolean;
  isCorrect?: boolean;
}

export interface KFScoreBoard {
  username: string;
  totalScore: number;
}
