import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCartOffComponent } from './new-cart-off.component';

describe('NewCartOffComponent', () => {
  let component: NewCartOffComponent;
  let fixture: ComponentFixture<NewCartOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCartOffComponent]
    });
    fixture = TestBed.createComponent(NewCartOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
