import { TestBed } from '@angular/core/testing';

import { VideoCallStateManagerService } from './video-call-state-manager.service';

describe('VideoCallStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoCallStateManagerService = TestBed.get(VideoCallStateManagerService);
    expect(service).toBeTruthy();
  });
});
