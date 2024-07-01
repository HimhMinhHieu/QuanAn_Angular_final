import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormDatBanComponent } from './new-form-dat-ban.component';

describe('NewFormDatBanComponent', () => {
  let component: NewFormDatBanComponent;
  let fixture: ComponentFixture<NewFormDatBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFormDatBanComponent]
    });
    fixture = TestBed.createComponent(NewFormDatBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
