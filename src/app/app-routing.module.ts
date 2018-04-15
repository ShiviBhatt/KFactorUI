import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { BoardComponent } from './board/board.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ChallengeViewerComponent } from './challenge-viewer/challenge-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'challenges', component: ChallengesComponent },
  { path: 'challenges/:id', component: ChallengeViewerComponent },
  { path: 'challenges/:id/start', component: PlaygroundComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
