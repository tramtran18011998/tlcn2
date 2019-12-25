import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAdminAccComponent } from './ad-admin-acc.component';

describe('AdAdminAccComponent', () => {
  let component: AdAdminAccComponent;
  let fixture: ComponentFixture<AdAdminAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdAdminAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAdminAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
