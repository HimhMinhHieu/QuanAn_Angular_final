import { Component, OnInit, inject } from '@angular/core';
import {
  Database,
  child,
  get,
  push,
  ref,
  remove,
  set,
  update,
} from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';

@Component({
  selector: 'app-food-off-detail',
  templateUrl: './food-off-detail.component.html',
  styleUrls: ['./food-off-detail.component.css'],
})
export class FoodOffDetailComponent implements OnInit {
  api = inject(ApiService);
  cookie = inject(CookieService);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  database = inject(Database);

  detail!: any;
  loading: any = true;
  backgroundImg!: any;
  idBan!: any;

  quantity: number = 1;
  sum!: number;

  carts: any = {};
  carts_image: any = {};

  async ngOnInit(): Promise<void> {
    let id = parseInt(this.route.snapshot.paramMap.get('idFood') as any);
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    let resFoodDetail = await this.api.getASYNC(endpoints.food_detail(id));
    this.detail = resFoodDetail;

    if (this.detail === null) {
      this.loading = true;
    } else {
      this.loading = false;
      this.backgroundImg = `background-image: url(${this.detail.image}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent; width: 100%`;
      this.sum = this.detail.price;
    }

    if (this.cookie.check('cart-off') === true) {
      this.carts = JSON.parse(this.cookie.get('cart-off'));
    }

    if (this.cookie.check('cart-off-image') === true) {
      this.carts_image = JSON.parse(this.cookie.get('cart-off-image'));
    }
  }

  onPlus() {
    this.quantity = this.quantity + 1;
    if (this.quantity <= 0) this.quantity = 1;
    this.sum = this.detail.price * this.quantity;
  }

  onMinus() {
    this.quantity = this.quantity - 1;
    if (this.quantity <= 0) this.quantity = 1;
    this.sum = this.detail.price * this.quantity;
  }

  onChangeQuan(value: any) {
    this.quantity = parseInt(value);
    this.sum = this.detail.price * this.quantity;
    // console.log(this.sum)
  }

  Back() {
    this.router.navigate([`ban/${this.idBan}`]);
  }

  addCartDetail(product: any) {
    // this.store.dispatch(increment({ payload: this.quantity }));

    // console.log(product.image);
    // console.log(this.quantity);

    if (product.id in this.carts_image) {
      this.carts_image[product.id].soLuong += this.quantity;
    } else {
      this.carts_image[product.id] = {
        image: product.image,
        idBan: this.idBan,
        idThucAn: product.id,
        name: product.name,
        soLuong: this.quantity,
        donGia: this.sum,
      };
    }

    if (product.id in this.carts) {
      this.carts[product.id].soLuong += this.quantity;
    } else {
      this.carts[product.id] = {
        idBan: this.idBan,
        idThucAn: product.id,
        name: product.name,
        soLuong: this.quantity,
        donGia: product.price,
      };
    }
    this.cookie.set('cart-off', JSON.stringify(this.carts));
    this.cookie.set('cart-off-image', JSON.stringify(this.carts_image));
  }

  gotoCartOff() {
    this.router.navigate([`/ban/`, this.idBan, `cartoffpay`]);
  }

  getToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) mm = '0' + mm;

    return dd + '-' + mm + '-' + yyyy;
  }

  gotoPayment() {
    const db = this.database;
    const dbRef = ref(db);
    get(child(dbRef, 'offer/ban/' + this.idBan))
      .then((snapshot) => {
        // return snapshot.val()
        // const db = getDatabase();
        // let roomID = uuid.v4();
        // console.warn(roomID);
        // A post entry.
        if (snapshot.val() !== null) {
          const postData = snapshot.val();
          const newChatroomRef = push(
            ref(
              this.database,
              `payment/bill/ban/${this.idBan}/${this.getToday()}`
            ),
            postData
          );
          const newChatroomId = newChatroomRef.key;
          this.cookie.set('idHD', JSON.stringify(newChatroomId));

          this.router.navigate([`ban/${this.idBan}/payment`]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
