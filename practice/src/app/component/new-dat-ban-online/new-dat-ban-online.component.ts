import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';

@Component({
  selector: 'app-new-dat-ban-online',
  templateUrl: './new-dat-ban-online.component.html',
  styleUrls: ['./new-dat-ban-online.component.css'],
  host: {
    '(document:keydown)' : 'keyPress($event)'
  }
})
export class NewDatBanOnlineComponent implements OnInit {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  route = inject(ActivatedRoute);
  authAPI = inject(AuthApiService);
  router = inject(Router);
  cookie = inject(CookieService);

  items: any = [];
  itemCount !: any
  nextItem!: any;
  previousItem !: any;
  count: any = 0;

  idChiNhanh !: any
  ban!:any
  user!: any
  loading!:any
  firstItem !: any;

  a: any = 0

  async ngOnInit(): Promise<void> {
    this.items = this.el.nativeElement.querySelectorAll('div.slider-item.active');
    this.itemCount = this.items.length;
    this.previousItem = this.el.nativeElement.querySelector('.previous');
    this.nextItem = this.el.nativeElement.querySelector('.next');
    console.log(this.items)

    let id = parseInt(this.route.snapshot.paramMap.get("idChiNhanh") as any);
    this.idChiNhanh = id;
    this.loading = true;

    let data = await this.authAPI.getAPIAsync(endpointsAuth.chiNhanh(4))
    if (data !== null) {
      this.loading = false
      this.ban = data
    }

    if(this.cookie.check('user')) {
      this.user = this.cookie.check('user')
    }

    if(this.ban !== null) {
        this.firstItem = this.ban[this.a];
    }
  }

  chonBan(idBan: any){
    this.router.navigate([`/datban/${this.idChiNhanh}/ban/`, idBan])
  }

  showNextItem() {
    // this.items[this.count].classList.remove('active');

    if(this.a < this.ban.length - 1) {
      this.a++;
      this.firstItem = this.ban[this.a]
      console.log(this.firstItem)
    } else {
      this.a--;
      this.firstItem = this.ban[this.a]
      console.log(this.firstItem)
    }

    // if(this.count < this.itemCount - 1) {
    //   this.count++;
    // } else {
    //   this.count = 0
    // }

    // this.items[this.count].classList.add('active');
  }

  showPreviousItem() {

    // this.items[this.count].classList.remove('active');

    if(this.a > 0) {
      this.a--;
      this.firstItem = this.ban[this.a]
      console.log(this.firstItem)
    } else {
      this.a = this.ban.length - 1;
      this.firstItem = this.ban[this.a]
      console.log(this.firstItem)
    }

    // if(this.count > 0) {
    //   this.count--;
    // } else {
    //   this.count = this.itemCount - 1;
    // }

    // this.items[this.count].classList.add('active');
  }

  keyPress(e: any) {
    e = e || window.event;

    if (e.keyCode == '37') {
      this.showPreviousItem();
    } else if (e.keyCode == '39') {
      this.showNextItem();
    }
  }
}
