import { TestBed } from '@angular/core/testing';

import { VideoCallManagerService } from './video-call-manager.service';

describe('VideoCallManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoCallManagerService = TestBed.get(VideoCallManagerService);
    expect(service).toBeTruthy();
  });
});
