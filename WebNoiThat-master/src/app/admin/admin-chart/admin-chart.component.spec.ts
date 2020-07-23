import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartComponent } from './admin-chart.component';

describe('AdminChartComponent', () => {
  let component: AdminChartComponent;
  let fixture: ComponentFixture<AdminChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
