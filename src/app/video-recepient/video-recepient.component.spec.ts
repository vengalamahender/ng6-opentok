import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRecepientComponent } from './video-recepient.component';

describe('VideoRecepientComponent', () => {
  let component: VideoRecepientComponent;
  let fixture: ComponentFixture<VideoRecepientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRecepientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecepientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
