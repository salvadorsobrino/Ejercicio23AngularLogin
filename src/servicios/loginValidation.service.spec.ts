/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginValidationService } from './loginValidation.service';

describe('Service: LoginValidation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginValidationService]
    });
  });

  it('should ...', inject([LoginValidationService], (service: LoginValidationService) => {
    expect(service).toBeTruthy();
  }));
});
