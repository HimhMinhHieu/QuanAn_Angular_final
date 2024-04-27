import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCommentComponent } from './chart-comment.component';

describe('ChartCommentComponent', () => {
  let component: ChartCommentComponent;
  let fixture: ComponentFixture<ChartCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCommentComponent]
    });
    fixture = TestBed.createComponent(ChartCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
