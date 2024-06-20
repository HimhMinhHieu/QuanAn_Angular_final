import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import {
  Database,
  child,
  get,
  off,
  onValue,
  push,
  ref,
  set,
} from '@angular/fire/database';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  database = inject(Database);
  cookie = inject(CookieService);
  route = inject(ActivatedRoute);
  router = inject(Router)
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModalWithClass(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  moment: any = moment;
  today: any = new Date();
  loading: any = false;

  people!: any;

  foods!: any;
  idBan!: any;
  idHD!: any;
  sum: any = 0;

  Object = Object;

  ngOnInit(): void {
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    if (this.cookie.check('idHD')) {
      this.idHD = JSON.parse(this.cookie.get('idHD'));
      // console.log(this.idHD)
    }
    const offerRef = ref(
      this.database,
      `payment/bill/ban/${this.idBan}/${this.getToday()}/${this.idHD}`
    );
    onValue(offerRef, (snapshot) => {
      if (snapshot.val() !== null) {
        this.loading = false;
        const data = snapshot.val();
        this.foods = data;
        for (let key of this.Object.keys(data)) {
          for (let f of this.Object.keys(data[key].cart.carts)) {
            this.sum +=
              data[key].cart.carts[f].donGia * data[key].cart.carts[f].soLuong;
          }
        }
        // console.log(data);
      } else {
        this.loading = true;
      }
    });

    const peopleRef = ref(this.database, `ban/${idBan}/people/`);
    onValue(peopleRef, (snapshot) => {
      // console.log("people", snapshot.val())
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        this.people = data;
        console.log('people2', snapshot.val());
      } else {
        // console.log('true', this.dis);
      }
    });

    // for(let k of this.offer()) {
    //   for(this.offer()[k].cart)
    // }

    () => {
      off(offerRef);
      off(peopleRef);
    };
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

  confirm(): void {
    const db = this.database;
    // this.message = 'Confirmed!';
    set(ref(db, `offer/`), null);
    set(ref(db, `ban/`), null);
    this.cookie.deleteAll('/');
    this.modalRef?.hide();
    this.router.navigate(['thankyou']);
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef?.hide();
  }

  taiCho() {
    const db = this.database;
    // this.message = 'Confirmed!';
    const dbRef = ref(this.database);
    get(child(dbRef, 'nhanvien/offer/'))
      .then((snapshot) => {
        // return snapshot.val()
        // const db = getDatabase();
        // let roomID = uuid.v4();
        // console.warn(roomID);
        // A post entry.
        const newChatroomRef = push(ref(this.database, 'nhanvien/offer/'), {
          ban: this.idBan,
          offer: 'Thanh toán',
          createdAt: `${this.today}`,
        });
        const newChatroomId = newChatroomRef.key;
        set(ref(db, `offer/`), null);
        set(ref(db, `ban/`), null);
        this.cookie.deleteAll('/');
        this.router.navigate(['thankyou']);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
