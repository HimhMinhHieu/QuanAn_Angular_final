import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaBepComponent } from './nha-bep.component';

describe('NhaBepComponent', () => {
  let component: NhaBepComponent;
  let fixture: ComponentFixture<NhaBepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhaBepComponent]
    });
    fixture = TestBed.createComponent(NhaBepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
