import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdProfileAddComponent } from './ad-profile-add.component';

describe('AdProfileAddComponent', () => {
  let component: AdProfileAddComponent;
  let fixture: ComponentFixture<AdProfileAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdProfileAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdProfileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
