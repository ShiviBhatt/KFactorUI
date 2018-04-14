import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  currentQuestion: KFQuestion;
  selectedOption: KFOption;

  constructor() { }

  chooseOption(option: KFOption): void {
    option.isLocked = true;
    this.selectedOption = option;
    setTimeout(() => {
      option.isLocked = false;
      option.isCorrect = false;
    }, 2000);
  }

  ngOnInit() {
    this.currentQuestion = {
      id: 'Q1',
      description: 'Which one is an input device?',
      options: [
        {
          id: 'OP1',
          value: 'Monitor'
        },
        {
          id: 'OP2',
          value: 'Mouse'
        },
        {
          id: 'OP3',
          value: 'HDD'
        },
        {
          id: 'OP4',
          value: 'RAM'
        }
      ]
    };
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
