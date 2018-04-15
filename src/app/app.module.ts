import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { BoardComponent } from './board/board.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlaygroundComponent } from './playground/playground.component';
import { DataService } from './data.service';
import { ChallengeViewerComponent } from './challenge-viewer/challenge-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChallengesComponent,
    BoardComponent,
    PlaygroundComponent,
    ChallengeViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
