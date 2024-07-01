import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Database, get, off, onValue, ref } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-offer-offline',
  templateUrl: './offer-offline.component.html',
  styleUrls: ['./offer-offline.component.css'],
  animations: [
    trigger('showAnimate', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1250, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class OfferOfflineComponent implements OnInit {
  database = inject(Database);
  router = inject(Router);
  route = inject(ActivatedRoute)

  offer: any = signal([]);
  idBan!: any;
  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  loading: any = false;

  moment: any = moment;

  Object = Object;
  ngOnInit(): void {
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    const offerRef = ref(this.database, `offer/ban/${idBan}`);
    onValue(offerRef, (snapshot) => {
      if(snapshot.val() !== null) {
        this.loading = false
      const data = snapshot.val();
      this.offer.set(data);
      // console.log(data);
      } else {
        this.loading = true
      }

    });

    // for(let k of this.offer()) {
    //   for(this.offer()[k].cart)
    // }

    () => {
      off(offerRef);
    };
  }

  gotoOfferDetail(value: any) {
    this.router.navigate([`ban/${this.idBan}/offer/offer-detail`], {
      queryParams: { food: JSON.stringify(value) }, skipLocationChange: true
    });
  }

  Back() {
    this.router.navigate([`ban/${this.idBan}`]);
  }

  pageChanged(page: any) {
    this.p = page;
  }
}
