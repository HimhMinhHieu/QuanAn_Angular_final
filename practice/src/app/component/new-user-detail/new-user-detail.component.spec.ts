import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserDetailComponent } from './new-user-detail.component';

describe('NewUserDetailComponent', () => {
  let component: NewUserDetailComponent;
  let fixture: ComponentFixture<NewUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserDetailComponent]
    });
    fixture = TestBed.createComponent(NewUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
