import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppAngularComponent } from './main-app-angular.component';

describe('MainAppAngularComponent', () => {
  let component: MainAppAngularComponent;
  let fixture: ComponentFixture<MainAppAngularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAppAngularComponent]
    });
    fixture = TestBed.createComponent(MainAppAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
