import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Database, child, get, ref } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Config/api.service';
import { AuthApiService } from 'src/app/Config/auth-api.service';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css'],
  animations: [
    trigger('showAnimate', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1250, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DetailOfferComponent {
  apis = inject(ApiService);
  // el = inject(ElementRef);
  router = inject(Router);
  cookie = inject(CookieService);
  authApi = inject(AuthApiService);
  database = inject(Database);
  route = inject(ActivatedRoute)

  loading: any = false;

  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  carts!: any;
  carts_images!: any;

  sum!: any;
  quantity!: any;

  idBan !: any;

  Object = Object;

  async ngOnInit(): Promise<void> {
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    this.route.queryParams.subscribe(params => {
      // console.log("state", JSON.parse(params['food']))
      this.carts_images = JSON.parse(params['food'])
      // console.log(this.carts_images)
    })
  }

  pageChanged(page: any) {
    this.p = page;
  }

  Back() {
    // this.idBan = 2
    this.router.navigate([`/ban/${this.idBan}/offer`]);
  }
}
