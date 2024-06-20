import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferOfflineComponent } from './offer-offline.component';

describe('OfferOfflineComponent', () => {
  let component: OfferOfflineComponent;
  let fixture: ComponentFixture<OfferOfflineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferOfflineComponent]
    });
    fixture = TestBed.createComponent(OfferOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
