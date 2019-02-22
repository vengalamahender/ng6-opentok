import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

export const enum VideoCallStates {
  noCall,
  incomingCall,
  calling,
  callStarted,
  callHungUpByOther
}

@Injectable({
  providedIn: 'root'
})
export class VideoCallStateManagerService {

   private _state: Subject<number> = new Subject<number>();

  getStateChange(): Observable<number> {
    return this._state.asObservable();
  }

  changeState(newState: number) {
    this._state.next(newState);
  }
}
