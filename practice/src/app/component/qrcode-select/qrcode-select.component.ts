import { Component, OnInit, inject } from '@angular/core';
import {
  Database,
  child,
  get,
  off,
  onValue,
  ref,
} from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-qrcode-select',
  templateUrl: './qrcode-select.component.html',
  styleUrls: ['./qrcode-select.component.css'],
})
export class QRCodeSelectComponent implements OnInit {
  database = inject(Database);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cookie = inject(CookieService);
  url!: any;

  people!: any;
  dis: any = false;
  access: any = true;

  idBan!: any;

  styleCss!: any;

  Object = Object;

  ngOnInit(): void {
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any);
    this.idBan = idBan;
    this.url = `http://localhost:4200/ban/${idBan}/CheckIn`;
    if (this.cookie.check('access')) {
      this.access = this.cookie.get('access');
    }
    // const dbRef = ref(this.database);
    // get(child(dbRef, `ban/${idBan}/people/`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     this.styleCss = 'display: inline-block !important'
    //   } else {
    //     this.styleCss = 'display: none!important'
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    if (this.access === 'false') {
      this.router.navigate([`ban/${idBan}`]);
    }
    const offerRef = ref(this.database, `ban/${idBan}/people/`);
    onValue(offerRef, (snapshot) => {
      // console.log("people", snapshot.val())
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        this.people = data;
        // console.log("people2", snapshot.val())
        if (Object.keys(data).length === 4) {
          this.router.navigate([`ban/${idBan}`]);
        }

        this.dis = false;
      } else {
        this.dis = true;
        // console.log('true', this.dis);
      }
    });

    // for(let k of this.offer()) {
    //   for(this.offer()[k].cart)
    // }

    () => {
      off(offerRef);
    };
  }

  checkIn() {
    this.router.navigate([`ban/${this.idBan}`]);
    this.access = false;
    this.cookie.set('access', this.access);
  }
}
