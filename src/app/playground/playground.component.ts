import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../socket.service';
import { MockDataService } from '../mock-data.service';

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
  challengeId: any;
  nextIndex: number;
  subscription: any;
  attemptedQuesCount: number = 0;

  constructor(
    private dataService: DataService, 
    private activatedRoute: ActivatedRoute, 
    private socketService: SocketService, 
    private router: Router,
    private mockDataService: MockDataService) {
      this.restUrls = dataService.getRestUrls();
      this.nextIndex = 0;
      this.activatedRoute.params.subscribe(params => {
        this.challengeId = params['id'];
      });
      if (this.subscription) return;
      this.subscription = this.socketService.getData().subscribe(msg => {
        if (msg.type == 'Q_RESP') {
            let question = msg.data[0].question;
            let prevAns = msg.data[0].prevAns;
            if (prevAns) {
              this.verifyAnswer(prevAns);
            }
            if (question) {
              this.currentQuestion = question;
              this.runTest();
            }
        } else if (msg.type == 'CC_RESP') {
          this.goToChallengeCompete();
        }
      });
  }

  startCountDown(onTimeup: Function): any {
    clearInterval(this.timer);
    this.remainingTime = 10; 
    let timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime == 0) {
        clearInterval(timer);
        onTimeup();
      }
    }, 1000);
    return timer;
  }

  requestQuestion(nextIndex: number) {
    let qReq = {
      type: 'Q_REQ',
      challengeid: this.challengeId,
      topic: this.socketService.ctMap[this.challengeId],
      nextIndex: nextIndex
    };
    this.socketService.socket.emit('message', qReq);
  }

  verifyAnswer(correctOption): void {
    if (this.selectedOption) {
      if (correctOption.id == this.selectedOption.id) {
        this.selectedOption.isLocked = false;
        this.selectedOption.isCorrect = true;
        this.selfScoreBoard.totalScore += parseInt(correctOption.scores[this.mockDataService.user.uid]);
      } else {
        this.selectedOption.isLocked = false;
        this.selectedOption.isCorrect = false;
      }
      this.selectedOption = null;
    }
    this.opponentScoreBoard.totalScore += parseInt(correctOption.scores[this.socketService.otherUser.uid]);
  }

  runTest() {
    this.attemptedQuesCount++;
    this.timer = this.startCountDown(() => {
      setTimeout(() => {
        this.requestNextQuestion();
      }, 2000);
    });
  }

  chooseOption(option: KFOption): void {
    if (this.selectedOption != null) {
      return;
    }
    clearInterval(this.timer);
    option.isLocked = true;
    this.selectedOption = option;
    this.requestNextQuestion();
  }

  goToChallengeCompete(): void {
    if (this.opponentScoreBoard.totalScore > this.selfScoreBoard.totalScore) {
      this.socketService.selfStatus.wins = false;
    } else {
      this.socketService.selfStatus.wins = true;
    }
    this.router.navigate(['/challenges/' + this.challengeId + '/end']);
  }

  ngOnInit() {
    this.opponentScoreBoard = {
      totalScore: 0,
      username: this.socketService.otherUser.userName
    };
    this.selfScoreBoard = {
      totalScore: 0,
      username: this.mockDataService.user.userName
    }
  }

  requestNextQuestion() {
    if (this.attemptedQuesCount < 6) {
      let caReq = {
        type: 'A_REQ',
        challengeId: this.challengeId,
        questionIndex: this.nextIndex,
        questionId: this.currentQuestion.id,
        uid: this.mockDataService.user.uid,
        optionId: this.selectedOption ? this.selectedOption.id : '',
        time: 10 - this.remainingTime,
        isAnswered: this.selectedOption ? true : false
      };
      this.socketService.socket.emit('message', caReq);
    } else {
      debugger;
      let ccReq = {
        type: "CC_REQ",
        challengeId: this.challengeId,
        uid: this.mockDataService.user.uid,
        totalScore: this.selfScoreBoard.totalScore
      }
      this.socketService.socket.emit('message', ccReq);
    }
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
