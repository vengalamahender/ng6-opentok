import { NgModule ,ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCallerComponent } from './video-caller/video-caller.component';
import { VideoRecepientComponent } from './video-recepient/video-recepient.component';

const appRoutes: Routes = [
  {
    path: 'recepient',
    component: VideoRecepientComponent
  },
  {
    path: 'caller',
    component: VideoCallerComponent
  }
];

const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)


@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class AppRoutingModule { }
