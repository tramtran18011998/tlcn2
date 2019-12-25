import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdReceiptEditComponent } from './ad-receipt-edit.component';

describe('AdReceiptEditComponent', () => {
  let component: AdReceiptEditComponent;
  let fixture: ComponentFixture<AdReceiptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdReceiptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdReceiptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
