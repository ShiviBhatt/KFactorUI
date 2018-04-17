import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
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
import { SocketService } from './socket.service';
import { MockDataService } from './mock-data.service';
import { ChallengeCompleteComponent } from './challenge-complete/challenge-complete.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChallengesComponent,
    BoardComponent,
    PlaygroundComponent,
    ChallengeViewerComponent,
    ProfileComponent,
    ChallengeCompleteComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DataService,
    HomeService,
    SocketService,
    MockDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
