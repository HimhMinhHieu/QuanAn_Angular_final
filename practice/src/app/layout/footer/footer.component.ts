import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/Config/api.service';
import { endpointsAuth } from 'src/app/Config/auth-api.service';
import goongjs from '@goongmaps/goong-js';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  API = inject(ApiService);

  chinhanh!: any;

  async ngOnInit(): Promise<void> {
    let data = await this.API.getASYNC_tmp(endpointsAuth.chiNhanh_detail(4));
    if(data !== null) {
      this.chinhanh = data;
      console.log('cn', data)
    }
    // console.log('cn', data)
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
