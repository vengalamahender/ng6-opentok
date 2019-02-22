import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallWidgetComponent } from './video-call-widget.component';

describe('VideoCallWidgetComponent', () => {
  let component: VideoCallWidgetComponent;
  let fixture: ComponentFixture<VideoCallWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCallWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
