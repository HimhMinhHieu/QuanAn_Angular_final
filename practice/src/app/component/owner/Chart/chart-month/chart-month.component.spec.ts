import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMonthComponent } from './chart-month.component';

describe('ChartMonthComponent', () => {
  let component: ChartMonthComponent;
  let fixture: ComponentFixture<ChartMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartMonthComponent]
    });
    fixture = TestBed.createComponent(ChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
