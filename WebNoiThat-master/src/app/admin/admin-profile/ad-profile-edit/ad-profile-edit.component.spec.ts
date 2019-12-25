import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdProfileEditComponent } from './ad-profile-edit.component';

describe('AdProfileEditComponent', () => {
  let component: AdProfileEditComponent;
  let fixture: ComponentFixture<AdProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
