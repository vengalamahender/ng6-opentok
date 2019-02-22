import { VideoCallStateManagerService, VideoCallStates } from "./video-call-state-manager.service";
import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {OpentokService} from "ng2-opentok/dist/opentok.service";
import {OTSignalEvent} from "ng2-opentok/dist/models/events/signal-event.model";
import {OTSession} from "ng2-opentok/dist/models/session.model";
import {OTPublisher, OTStreamEvent} from "ng2-opentok";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';

export const Signals = {
  showMessage: "showMessage"
}

export interface VideoCallLifeCycles {
  onIncomingCall(): void;

  onMediaAccessRequest(): void;

  onMediaAccessDenied(): void;

  onCallHungUpByOther(): void;

  onCallHungUp(): void;

  onNetworkLost(): void;

  onMissedCall(): void;

  onMessageReceived(message: string): void;

  onVideoChanged(): void;
}

@Injectable({
  providedIn: 'root'
})
export class VideoCallManagerService {
 	private _session: OTSession;
  	private _listeners: VideoCallLifeCycles[] = [];
  	private subscriptions: Subscription[] = [];

  constructor(private _callService: OpentokService,
              private videoCallStateManager: VideoCallStateManagerService) {
    videoCallStateManager.changeState(VideoCallStates.noCall);
  }

  addVideoCallLifeCyclesListener(element: VideoCallLifeCycles) {
    this._listeners.push(element);
  }

  removeVideoCallLifeCyclesListener(element: VideoCallLifeCycles) {
    this.unsubscribeFromAllHooks();
    let index = this._listeners.indexOf(element, 0);
    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }

  initIncomingCallRequirements(sessionId: string, token: string, publisherTag: string, publisherProperties: {}, subscriberTag: string, subscriberProperties: {}) {
    return this._callService.connectToSession(sessionId, token)
      .do((session: OTSession) => {
        this._session = session;
        this._listenToEndCall();
        this._listenToIncomingCall(subscriberTag, subscriberProperties);
        this._listenToNetworkFailedForPublisher();
        this._listenToMessage();
      });
  }

  onSignal(): Observable<OTSignalEvent> {
    return this._callService.onSignal(Signals.showMessage);
  }

  sendSignal(data: string) {
    this._callService.sendSignal(Signals.showMessage, data).subscribe();
  }

  hangUp(): void {
    this._callService.hangUp();
    this.unsubscribeFromAllHooks();
    this._session = null;
    this._listeners.forEach((elem: VideoCallLifeCycles) => {
      elem.onCallHungUp();
    });
  }

  call(publisherTag: string, publisherProperties: {}): Observable<boolean> {
    return this._callService.initCaller(publisherTag, publisherProperties)
      .flatMap((publisher: OTPublisher) => {
        return this._callService.call().do(() => {
          this._listenToOpenMediaAccessDialog();
          this._listenToMediaAccessDenied();
          this._listenToVideoChanges();
        });
      });

  }

  getSubscriberScreenshot(): string {
    return this._callService.getSubscriberScreenshot();
  }

  showVideo(show: boolean) {
    this._callService.publishVideo(show);
  }

  private _listenToOpenMediaAccessDialog() {
    let sub = this._callService.onOpenMediaAccessDialog().do(() => {
      this._listeners.forEach((elem: VideoCallLifeCycles) => {
        elem.onMediaAccessRequest();
      });
    }).subscribe();
    this.subscriptions.push(sub);
  }

  private _listenToMediaAccessDenied() {
    let sub = this._callService.onMediaAccessDenied().do(() => {
      this._listeners.forEach((elem: VideoCallLifeCycles) => {
        elem.onMediaAccessDenied();
      });
    }).subscribe();
    this.subscriptions.push(sub);
  }

  private _listenToIncomingCall(subscriberTag: string, subscriberProperties: {}) {
    let sub = this._callService.onIncomingCall(subscriberTag, subscriberProperties)
      .subscribe((event: OTStreamEvent) => {
        this._listeners.forEach((elem: VideoCallLifeCycles) => {
          elem.onIncomingCall();
        });

      });
    this.subscriptions.push(sub);
  }

  private _listenToEndCall() {
    let sub = this._callService.onEndCall().do(() => {
      this._listeners.forEach((elem: VideoCallLifeCycles) => {
        elem.onCallHungUpByOther();
      });
    }).subscribe();
    this.subscriptions.push(sub);
  }

  private _listenToNetworkFailedForPublisher() {
    let sub = this._callService.onNetworkFailedForPublisher().subscribe(() => {
      this._listeners.forEach((elem: VideoCallLifeCycles) => {
        elem.onNetworkLost();
      });
    });
    this.subscriptions.push(sub);
  }

  private _listenToMessage() {
    let sub = this._callService.onSignal(Signals.showMessage)
      .filter((event: OTSignalEvent) => {
        // Signal received from another client
        return event.from.getConnectionId() != this._session.getConnection().getConnectionId();
      })
      .subscribe((signal: OTSignalEvent) => {
        this._listeners.forEach((elem: VideoCallLifeCycles) => {
          elem.onMessageReceived(signal.data);
        });
      });
    this.subscriptions.push(sub);
  }

  private _listenToVideoChanges() {
    let sub = this._callService.onVideoChanged().subscribe(() => {
      this._listeners.forEach((elem: VideoCallLifeCycles) => {
        elem.onVideoChanged();
      });
    });
    this.subscriptions.push(sub);
  }

  private unsubscribeFromAllHooks() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}
