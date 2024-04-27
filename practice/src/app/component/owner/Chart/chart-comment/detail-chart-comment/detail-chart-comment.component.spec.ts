import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChartCommentComponent } from './detail-chart-comment.component';

describe('DetailChartCommentComponent', () => {
  let component: DetailChartCommentComponent;
  let fixture: ComponentFixture<DetailChartCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailChartCommentComponent]
    });
    fixture = TestBed.createComponent(DetailChartCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
