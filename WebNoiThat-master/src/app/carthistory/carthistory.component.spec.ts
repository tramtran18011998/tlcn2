import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarthistoryComponent } from './carthistory.component';

describe('CarthistoryComponent', () => {
  let component: CarthistoryComponent;
  let fixture: ComponentFixture<CarthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
