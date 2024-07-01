import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCartOnlineComponent } from './new-cart-online.component';

describe('NewCartOnlineComponent', () => {
  let component: NewCartOnlineComponent;
  let fixture: ComponentFixture<NewCartOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCartOnlineComponent]
    });
    fixture = TestBed.createComponent(NewCartOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
