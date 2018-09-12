import { TestBed, inject } from '@angular/core/testing';

import { DataSharedService } from './data-shared.service';
import { HttpModule } from '@angular/http';

describe('DataSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpModule ],
      providers: [DataSharedService]
    });
  });

  it('should be created', inject([DataSharedService], (service: DataSharedService) => {
    expect(service).toBeTruthy();
  }));
});
