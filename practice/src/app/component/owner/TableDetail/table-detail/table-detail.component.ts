import { Component, OnInit, inject } from '@angular/core';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css'],
})
export class TableDetailComponent implements OnInit {

  authAPIs = inject(AuthApiService)

  detailCN!: any;

  async ngOnInit(): Promise<void> {
    //ChiNhanh_detail
    let detail = await this.authAPIs.getAPIAsync(
      endpointsAuth.chiNhanh_detail(4)
    );
    this.detailCN = detail;
    //...
  }
}
