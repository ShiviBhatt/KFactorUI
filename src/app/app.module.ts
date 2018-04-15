import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { BoardComponent } from './board/board.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlaygroundComponent } from './playground/playground.component';
import { DataService } from './data.service';
import { ChallengeViewerComponent } from './challenge-viewer/challenge-viewer.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeService } from './home/homeService';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChallengesComponent,
    BoardComponent,
    PlaygroundComponent,
    ChallengeViewerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
