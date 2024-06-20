import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeSelectComponent } from './qrcode-select.component';

describe('QRCodeSelectComponent', () => {
  let component: QRCodeSelectComponent;
  let fixture: ComponentFixture<QRCodeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeSelectComponent]
    });
    fixture = TestBed.createComponent(QRCodeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
