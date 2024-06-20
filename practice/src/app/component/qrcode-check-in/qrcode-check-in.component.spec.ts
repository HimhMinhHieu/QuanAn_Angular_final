import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeCheckInComponent } from './qrcode-check-in.component';

describe('QRCodeCheckInComponent', () => {
  let component: QRCodeCheckInComponent;
  let fixture: ComponentFixture<QRCodeCheckInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeCheckInComponent]
    });
    fixture = TestBed.createComponent(QRCodeCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
