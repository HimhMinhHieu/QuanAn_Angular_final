import { Component, OnInit, inject } from '@angular/core';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
// declare var goongjs: any;
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

    // goongjs.accessToken = 'ZBW8jY63phmmYWvI3ZazY3g95Gb8CejAVA9yhXm3';
    // var map = new goongjs.Map({
    //   container: 'map',
    //   style: 'https://tiles.goong.io/assets/navigation_day.json',
    //   center: [106.725376, 10.7872256],
    //   zoom: 15,
    // });

    // var marker = new goongjs.Marker()
    //   .setLngLat([106.725376, 10.7872256])
    //   .addTo(map);
  }
}
