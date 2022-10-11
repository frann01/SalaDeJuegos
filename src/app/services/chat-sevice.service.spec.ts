import { TestBed } from '@angular/core/testing';

import { ChatSeviceService } from './chat-sevice.service';

describe('ChatSeviceService', () => {
  let service: ChatSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
