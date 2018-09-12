import { TestBed, inject } from '@angular/core/testing';

import { OpterecenjaService } from './opterecenja.service';

describe('OpterecenjaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpterecenjaService]
    });
  });

  it('should be created', inject([OpterecenjaService], (service: OpterecenjaService) => {
    expect(service).toBeTruthy();
  }));
});
