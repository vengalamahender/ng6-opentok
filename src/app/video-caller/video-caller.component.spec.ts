import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallerComponent } from './video-caller.component';

describe('VideoCallerComponent', () => {
  let component: VideoCallerComponent;
  let fixture: ComponentFixture<VideoCallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
