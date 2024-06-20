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
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  animations: [
    trigger('showAnimate', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1250, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ChatbotComponent implements OnInit {
  // @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  // @ViewChild('slideRight') slideRight!: ElementRef;
  // @ViewChild('slideLeft') slideLeft!: ElementRef;

  // APIs = inject(ApiService);
  store = inject(Store);
  cookie = inject(CookieService);

  dataFoodRecommend!: any;
  count: number = 1;
  private carts: any = {};
  user!: any;
  huser: any = false;
  loading: any = false;
  // async ngOnInit(): Promise<void> {
  //   // let data = await this.APIs.postASYNC(endpoints.sentiment_user, {
  //   //   idNguoiDung: 3,
  //   // });

  //   // if (data !== null) {
  //   //   this.dataFoodRecommend = data;
  //   // }
  //   // console.log(this.slidesLength);

  //   if (this.cookie.check('user') === true) {
  //     this.user = JSON.parse(this.cookie.get('user'));
  //     this.huser = true;
  //   }

  //   if (this.cookie.check('cart-foodapp') === true) {
  //     this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
  //   }
  // }

  // activeSlideIndex = 0;
  // slidesLength = 0;

  // async ngAfterViewInit() {
  //   let data = await this.APIs.postASYNC(endpoints.sentiment_user, {
  //     idNguoiDung: this.user.id,
  //   });

  //   if (data === null) {
  //     this.loading = true;
  //   }

  //   if (data !== null) {
  //     this.loading = false;
  //     this.dataFoodRecommend = data;
  //     this.slidesLength = this.dataFoodRecommend.length;
  //     this.slideLeft.nativeElement.style.top = `-${
  //       (this.slidesLength - 1) * 30
  //     }vh`;
  //   }
  //   console.log(this.slidesLength);
  // }

  // changeSlide(direction: 'up' | 'down') {
  //   const sliderHeight = this.sliderContainer.nativeElement.clientHeight;
  //   if (direction === 'up') {
  //     this.activeSlideIndex++;
  //     if (this.activeSlideIndex > this.slidesLength - 1) {
  //       this.activeSlideIndex = 0;
  //       console.log(this.slidesLength);
  //     }
  //   } else if (direction === 'down') {
  //     this.activeSlideIndex--;
  //     if (this.activeSlideIndex < 0) {
  //       this.activeSlideIndex = this.slidesLength - 1;
  //       console.log(this.slidesLength);
  //     }
  //   }
  //   this.slideRight.nativeElement.style.transform = `translateY(-${
  //     this.activeSlideIndex * sliderHeight
  //   }px)`;
  //   this.slideLeft.nativeElement.style.transform = `translateY(${
  //     this.activeSlideIndex * sliderHeight
  //   }px)`;
  // }

  // addCart(product: any) {
  //   this.store.dispatch(increment({ payload: this.count }));
  //   console.log(product);
  //   console.log(product.id);
  //   console.log(this.carts);
  //   if (product.id in this.carts) {
  //     this.carts[product.id].soLuong += 1;
  //   } else {
  //     this.carts[product.id] = {
  //       idNguoiDung: this.user.id,
  //       idThucAn: product.id,
  //       name: product.name,
  //       soLuong: 1,
  //       donGia: product.price,
  //     };
  //   }
  //   this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
  // }

  apis = inject(ApiService);
  el = inject(ElementRef);

  backgroundBody: any =
    'https://media.istockphoto.com/id/1307190527/photo/happy-waiter-serving-food-to-group-of-friends-in-a-pub.jpg?s=612x612&w=0&k=20&c=EDqQ0oBcpFGV25p61vWUF5N-6lRJdbmZmQMe5kyuxyA=';
  backgroundFood!: any;
  backTmp!: any;
  anim: any = false;

  // loading: any = false;
  quantity: number = 1;

  foods!: any;
  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  // constructor(elm: ElementRef) {
  //   let src = elm.nativeElement.getAttribute('src');
  //   console.log('src: ', src);
  // }

  async ngOnInit(): Promise<void> {
      if (this.cookie.check('user') === true) {
        this.user = JSON.parse(this.cookie.get('user'));
        this.huser = true;
      }

      if (this.cookie.check('cart-foodapp') === true) {
        this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
      }
    this.backgroundFood = `background-image: url(${this.backgroundBody}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent; width: 100%`;
    // let foodsRes = await this.apis.getASYNC(endpoints.foods);
    // this.foods = foodsRes;
    // if (this.foods === null) {
    //   this.loading = true;
    // }
    let data = await this.apis.postASYNC(endpoints.sentiment_user, {
      idNguoiDung: this.user.id,
    });

    if (data === null) {
      this.loading = true;
    } else {
      this.dataFoodRecommend = data;
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

  mouseInImage(image: any) {
    this.backTmp = image.src;
    this.backgroundFood = `background-image: url(${image.src}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent; width: 100%`;
  }

  mouseOutImage() {
    this.backgroundFood = `background-image: url(${this.backgroundBody}); background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: background-image 1.5s ease-in; background: transparent; width: 100%`;
  }

  pageChanged(page: any) {
    this.p = page;
    this.anim = true;
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
