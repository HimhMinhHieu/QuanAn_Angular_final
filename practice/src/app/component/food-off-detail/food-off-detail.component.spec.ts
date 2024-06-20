import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOffDetailComponent } from './food-off-detail.component';

describe('FoodOffDetailComponent', () => {
  let component: FoodOffDetailComponent;
  let fixture: ComponentFixture<FoodOffDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodOffDetailComponent]
    });
    fixture = TestBed.createComponent(FoodOffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
