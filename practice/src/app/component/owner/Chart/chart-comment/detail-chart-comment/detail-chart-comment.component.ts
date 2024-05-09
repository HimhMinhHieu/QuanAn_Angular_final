import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-chart-comment',
  templateUrl: './detail-chart-comment.component.html',
  styleUrls: ['./detail-chart-comment.component.css']
})
export class DetailChartCommentComponent {
  @Input() name: any;
  @Input() y: any;
}
