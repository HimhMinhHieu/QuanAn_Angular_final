import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharMonthYearComponent } from './char-month-year.component';

describe('CharMonthYearComponent', () => {
  let component: CharMonthYearComponent;
  let fixture: ComponentFixture<CharMonthYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharMonthYearComponent]
    });
    fixture = TestBed.createComponent(CharMonthYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
