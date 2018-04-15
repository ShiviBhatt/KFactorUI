import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeViewerComponent } from './challenge-viewer.component';

describe('ChallengeViewerComponent', () => {
  let component: ChallengeViewerComponent;
  let fixture: ComponentFixture<ChallengeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
