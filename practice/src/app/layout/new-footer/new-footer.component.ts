import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/Config/api.service';
import goongjs from '@goongmaps/goong-js';

@Component({
  selector: 'app-new-footer',
  templateUrl: './new-footer.component.html',
  styleUrls: ['./new-footer.component.css']
})
export class NewFooterComponent implements OnInit {
  API = inject(ApiService);

  chiNhanh:any = 4;

  ngOnInit(): void {
    goongjs.accessToken = 'IaGefUsaQiWrsd3NdHuw3gPAXddl7DSF9EKJVs8E';
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/navigation_day.json',
      center: [106.68991412428656,10.775919788087863],
      zoom: 15,
    });

    var marker = new goongjs.Marker()
      .setLngLat([106.68991412428656,10.775919788087863])
      .addTo(map);
  }
}
