import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCompleteComponent } from './challenge-complete.component';

describe('ChallengeCompleteComponent', () => {
  let component: ChallengeCompleteComponent;
  let fixture: ComponentFixture<ChallengeCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
