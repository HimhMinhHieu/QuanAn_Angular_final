import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDatBanOnlineComponent } from './new-dat-ban-online.component';

describe('NewDatBanOnlineComponent', () => {
  let component: NewDatBanOnlineComponent;
  let fixture: ComponentFixture<NewDatBanOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDatBanOnlineComponent]
    });
    fixture = TestBed.createComponent(NewDatBanOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
