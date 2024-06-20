import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOfferComponent } from './detail-offer.component';

describe('DetailOfferComponent', () => {
  let component: DetailOfferComponent;
  let fixture: ComponentFixture<DetailOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOfferComponent]
    });
    fixture = TestBed.createComponent(DetailOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
