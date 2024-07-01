import { Component, OnInit, inject } from '@angular/core';
import { ApiService, endpoints } from 'src/app/Config/api.service';

@Component({
  selector: 'app-menu-preview',
  templateUrl: './menu-preview.component.html',
  styleUrls: ['./menu-preview.component.css']
})
export class MenuPreviewComponent implements OnInit {
  api = inject(ApiService);

  food !: any;

  async ngOnInit(): Promise<void> {
    let data = await this.api.getASYNC(endpoints.foods);
    if(data !== null) {
      this.food = data
    }
  }
}
