import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { OpentokModule } from "ng2-opentok/dist/opentok.module"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';
import { VideoCallerComponent } from './video-caller/video-caller.component';
import { VideoRecepientComponent } from './video-recepient/video-recepient.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { VideoCallWidgetComponent } from './shared/video-call-widget/video-call-widget.component';



@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    VideoCallerComponent,
    VideoRecepientComponent,
    LoadingComponent,
    VideoCallWidgetComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    OpentokModule.forRoot({apiKey: "46272032"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
