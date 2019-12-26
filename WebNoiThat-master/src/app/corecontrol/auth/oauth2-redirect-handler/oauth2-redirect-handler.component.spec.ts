import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2RedirectHandlerComponent } from './oauth2-redirect-handler.component';

describe('OAuth2RedirectHandlerComponent', () => {
  let component: OAuth2RedirectHandlerComponent;
  let fixture: ComponentFixture<OAuth2RedirectHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuth2RedirectHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuth2RedirectHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
