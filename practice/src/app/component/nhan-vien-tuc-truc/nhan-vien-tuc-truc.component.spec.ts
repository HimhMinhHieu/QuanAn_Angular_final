import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienTucTrucComponent } from './nhan-vien-tuc-truc.component';

describe('NhanVienTucTrucComponent', () => {
  let component: NhanVienTucTrucComponent;
  let fixture: ComponentFixture<NhanVienTucTrucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhanVienTucTrucComponent]
    });
    fixture = TestBed.createComponent(NhanVienTucTrucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
