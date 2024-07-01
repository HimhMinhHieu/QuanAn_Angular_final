import { Component, OnInit, inject, signal } from '@angular/core';
import {
  Database,
  off,
  onValue,
  ref,
  set,
  update,
} from '@angular/fire/database';
import * as moment from 'moment';

@Component({
  selector: 'app-nha-bep',
  templateUrl: './nha-bep.component.html',
  styleUrls: ['./nha-bep.component.css'],
})
export class NhaBepComponent implements OnInit {
  database = inject(Database);

  loading: any = false;
  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  offer: any = signal([]);
  foodTotal: any = signal({});
  offerTotal: any = signal({});
  moment: any = moment;

  Object = Object;

  idItem: any = -1;
  done: any = false;
  ngOnInit(): void {
    const offerRef = ref(this.database, `offer/cook`);
    onValue(offerRef, (snapshot) => {
      if (snapshot.val() !== null) {
        this.loading = false;
        const data = snapshot.val();
        this.offer.set(data);
        // console.log(data);
      } else {
        this.loading = true;
      }
    });

    // for(let f of this.Object.keys())

    // for(let k of this.offer()) {
    //   for(this.offer()[k].cart)
    // }

    () => {
      off(offerRef);
    };
  }

  pageChanged(page: any) {
    this.p = page;
  }

  doneFood(foodID: string, food: any, offerID: string) {
    const offerRef = ref(
      this.database,
      `offer/cook/${offerID}/cart/carts/${foodID}`
    );
    onValue(offerRef, (snapshot) => {
      if (snapshot.val() !== null) {
        // this.loading = false;
        const data = snapshot.val();
        this.foodTotal.set(data);
        // console.log(data);
        const db = this.database;
        const postData = {
          image: this.foodTotal().image,
          idBan: this.foodTotal().idBan,
          idThucAn: this.foodTotal().idThucAn,
          name: this.foodTotal().name,
          soLuong: this.foodTotal().soLuong,
          donGia: this.foodTotal().donGia,
          done: true,
        };

        const updates: any = {};
        updates[`offer/cook/${offerID}/cart/carts/${foodID}`] = postData;
        update(ref(this.database), updates);
      } else {
        // this.loading = true;
      }
    });
  }

  isDone(offer: any, offerID: any) {
    const offerCookRef = ref(this.database, `offer/cook/${offerID}`);
    onValue(offerCookRef, (snapshot) => {
      if (snapshot.val() !== null) {
        // this.loading = false;
        const data = snapshot.val();
        this.offerTotal.set(data);
        // console.log(data);
        // const db = this.database;
        const postData = {
          ban: this.offerTotal().ban,
          cart: {
            carts: this.offerTotal().cart.carts,
          },
          note: 'Đưa món',
          done: true,
          createdAt: this.offerTotal().createdAt,
          offer: this.offerTotal().offer,
        };

        const updates: any = {};
        updates[`offer/cook/${offerID}`] = postData;
        update(ref(this.database), updates);

        const offerRef = ref(
          this.database,
          `offer/ban/${this.offerTotal().ban}/${this.offerTotal().offer}`
        );
        onValue(offerRef, (snapshot) => {
          if (snapshot.val() !== null) {
            // this.loading = false;
            // const data = snapshot.val();
            // this.offerTotal.set(data);
            // console.log(data);
            // const db = this.database;
            const postData = {
              offer: this.offerTotal().offer,
              ban: this.offerTotal().ban,
              cart: {
                carts: this.offerTotal().cart.carts,
              },
              note: 'Đưa món',
              done: true,
              createdAt: this.offerTotal().createdAt,
            };

            const updates: any = {};
            updates[`offer/ban/${this.offerTotal().ban}/${this.offerTotal().offer}`] = postData;
            update(ref(this.database), updates);
          } else {
            // this.loading = true;
          }
        });
      } else {
        // this.loading = true;
      }
    });
  }
}
