import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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

@Component({
  selector: 'app-datmon-offline',
  templateUrl: './datmon-offline.component.html',
  styleUrls: ['./datmon-offline.component.css'],
  animations: [
    trigger('showAnimate', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1250, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DatmonOfflineComponent implements OnInit {
  apis = inject(ApiService);
  el = inject(ElementRef);
  router = inject(Router);
  cookie = inject(CookieService);
  database = inject(Database);
  route = inject(ActivatedRoute);

  // backgroundBody: any =
  //   'https://media.istockphoto.com/id/1307190527/photo/happy-waiter-serving-food-to-group-of-friends-in-a-pub.jpg?s=612x612&w=0&k=20&c=EDqQ0oBcpFGV25p61vWUF5N-6lRJdbmZmQMe5kyuxyA=';
  // backgroundFood!: any;
  // backTmp!: any;
  // anim: any = false;
  idBan!: any;

  loading: any = false;
  quantity: number = 1;

  foods!: any;
  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // constructor(elm: ElementRef) {
  //   let src = elm.nativeElement.getAttribute('src');
  //   console.log('src: ', src);
  // }

  async ngOnInit(): Promise<void> {
    // this.backgroundFood = `background-image: url(${this.backgroundBody}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent`;
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    let foodsRes = await this.apis.getASYNC(endpoints.foods);
    this.foods = foodsRes;
    if (this.foods === null) {
      this.loading = true;
    }
  }

  onPlus() {
    this.quantity = this.quantity + 1;
    if (this.quantity <= 0) this.quantity = 1;
  }

  onMinus() {
    this.quantity = this.quantity - 1;
    if (this.quantity <= 0) this.quantity = 1;
  }

  onChangeQuan(value: any) {
    this.quantity = parseInt(value);
  }

  // mouseInImage(image: any) {
  //   this.backTmp = image.src;
  //   this.backgroundFood = `background-image: url(${image.src}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent`;
  // }

  // mouseOutImage() {
  //   this.backgroundFood = `background-image: url(${this.backgroundBody}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent`;
  // }

  pageChanged(page: any) {
    this.p = page;
  }

  gotoDetail(id: any) {
    this.idBan = 2;
    this.router.navigate([`/ban/`, this.idBan, `food`, id]);
  }

  gotoCartOff() {
    this.idBan = 2;
    this.router.navigate([`/ban/`, this.idBan, `cartoffpay`]);
  }

  gotoOffer() {
    this.idBan = 2;
    this.router.navigate([`/ban/`, this.idBan, `offer`]);
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

// mouseInCard() {
//    this.backgroundFood = `background-image: url(${this.backTmp}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: all 0.2s ease; background: transparent`
// }

// mouseOutCard() {
//   // this.backgroundBody = 'https://media.istockphoto.com/id/1307190527/photo/happy-waiter-serving-food-to-group-of-friends-in-a-pub.jpg?s=612x612&w=0&k=20&c=EDqQ0oBcpFGV25p61vWUF5N-6lRJdbmZmQMe5kyuxyA='
//   this.backgroundFood = `background-image: url(${this.backgroundBody}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: all 0.2s ease; background: transparent`
// }

// public foods:any = [];
// loading!: any
// count: any = 1;
// carts:any = {}
// idBan!: any
// constructor(private apis: ApiService,
//   private cookie: CookieService,
//   private store:Store<{counter: {counter: number}}>,
//   private cartService: MyCartService,
//   private route: ActivatedRoute
//   ){

// }

// ngOnInit(): void {
// this.idBan = parseInt(this.route.snapshot.paramMap.get("idBan") as any);
// console.log(this.idBan)
// this.loading = true
// this.apis.get(endpoints.foods).subscribe((data) => {
//   this.foods = data
//   this.loading = false
// })
// }

// addCart(product: any)
// {
//   this.store.dispatch(increment({ payload: this.count }));
//   if (product.id in this.carts) {
//     this.carts[product.id].soLuong += 1;
//   } else {
//     this.carts[product.id] = {
//       idBan: this.idBan,
//       idThucAn: product.id,
//       name: product.name,
//       soLuong: 1,
//       donGia: product.price
//     };
//   }
//   this.cookie.set('cartOff', JSON.stringify(this.carts));
//   console.log(JSON.parse(this.cookie.get('cartOff')))
// }
