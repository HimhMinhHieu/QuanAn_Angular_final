import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { ApiService, endpoints } from '../Config/api.service';
import { Store } from '@ngrx/store';
import { increment } from '../Reducer/MyCartCounterState/counter.actions';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements AfterViewInit, OnInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('slideRight') slideRight!: ElementRef;
  @ViewChild('slideLeft') slideLeft!: ElementRef;

  APIs = inject(ApiService);
  store = inject(Store);
  cookie = inject(CookieService);

  dataFoodRecommend!: any;
  count: number = 1;
  private carts: any = {};
  user!: any;
  huser: any = false;
  loading: any = false;
  async ngOnInit(): Promise<void> {
    // let data = await this.APIs.postASYNC(endpoints.sentiment_user, {
    //   idNguoiDung: 3,
    // });

    // if (data !== null) {
    //   this.dataFoodRecommend = data;
    // }
    // console.log(this.slidesLength);

    if (this.cookie.check('user') === true) {
      this.user = JSON.parse(this.cookie.get('user'));
      this.huser = true;
    }

    if (this.cookie.check('cart-foodapp') === true) {
      this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
    }
  }

  activeSlideIndex = 0;
  slidesLength = 0;

  async ngAfterViewInit() {
    let data = await this.APIs.postASYNC(endpoints.sentiment_user, {
      idNguoiDung: this.user.id,
    });

    if (data === null) {
      this.loading = true;
    }

    if (data !== null) {
      this.loading = false;
      this.dataFoodRecommend = data;
      this.slidesLength = this.dataFoodRecommend.length;
      this.slideLeft.nativeElement.style.top = `-${
        (this.slidesLength - 1) * 30
      }vh`;
    }
    console.log(this.slidesLength);
  }

  changeSlide(direction: 'up' | 'down') {
    const sliderHeight = this.sliderContainer.nativeElement.clientHeight;
    if (direction === 'up') {
      this.activeSlideIndex++;
      if (this.activeSlideIndex > this.slidesLength - 1) {
        this.activeSlideIndex = 0;
        console.log(this.slidesLength);
      }
    } else if (direction === 'down') {
      this.activeSlideIndex--;
      if (this.activeSlideIndex < 0) {
        this.activeSlideIndex = this.slidesLength - 1;
        console.log(this.slidesLength);
      }
    }
    this.slideRight.nativeElement.style.transform = `translateY(-${
      this.activeSlideIndex * sliderHeight
    }px)`;
    this.slideLeft.nativeElement.style.transform = `translateY(${
      this.activeSlideIndex * sliderHeight
    }px)`;
  }

  addCart(product: any) {
    this.store.dispatch(increment({ payload: this.count }));
    console.log(product);
    console.log(product.id);
    console.log(this.carts);
    if (product.id in this.carts) {
      this.carts[product.id].soLuong += 1;
    } else {
      this.carts[product.id] = {
        idNguoiDung: this.user.id,
        idThucAn: product.id,
        name: product.name,
        soLuong: 1,
        donGia: product.price,
      };
    }
    this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
  }
}
