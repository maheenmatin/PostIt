import { TestBed } from '@angular/core/testing';

import { VoteService } from './vote.service';

describe('VoteServiceService', () => {
  let service: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
