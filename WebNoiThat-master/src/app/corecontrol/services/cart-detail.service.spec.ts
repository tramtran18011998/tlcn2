import { TestBed } from '@angular/core/testing';

import { CartDetailService } from './cart-detail.service';

describe('CartDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDetailService = TestBed.get(CartDetailService);
    expect(service).toBeTruthy();
  });
});
