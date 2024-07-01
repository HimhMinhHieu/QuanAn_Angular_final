import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { increment } from 'src/app/Reducer/MyCartCounterState/counter.actions';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css'],
})
export class NewMenuComponent implements OnInit {
  apis = inject(ApiService);
  cookie = inject(CookieService);
  store = inject(Store);

  foods!: any;
  loading: any = false;
  count: number = 1;

  user!: any;
  public carts: any = {};
  cart_image: any = {};

  p: number = 1;
  itemPerPage: number = 6;
  totalProduct!: any;

  idItem!: any;
  itemCore: any = null;

  category!: any;
  imgTmp: string =
    'https://cdn.sanity.io/images/pmfmd3fy/production/1890f490a2c058a1610182b8153e5cd6cc5686aa-1996x3000.jpg?w=2048&q=90&auto=format';

  addImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnprgD9pRvZh4q5Xn13V9pZsFS2P3crV_4TA&s';
  addName: string = 'Angular Project';
  backgroundImage: any = `background-image: url(${this.imgTmp});
                            background-size: cover;
                            background-position: center;
  `;

  addAnimation: string = '';
  a: any = false;

  async ngOnInit(): Promise<void> {
    let data = await this.apis.getFood(endpoints.foods);
    this.foods = data;
    if (this.foods !== null) {
      this.loading = false;
      for (let f of this.foods) {
        this.category = f.idLoai.name;
      }
    }
    if (this.foods === null) this.loading = true;

    if (this.cookie.check('user') === true) {
      this.user = JSON.parse(this.cookie.get('user'));
    }

    if (this.cookie.check('cart-foodapp') === true) {
      this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
    }
     if (this.cookie.check('cart-image-foodapp') === true) {
      this.cart_image = JSON.parse(this.cookie.get('cart-image-foodapp'));
    }
  }

  clickOnItem(item: any) {
    this.a = true;

    this.addAnimation = 'animation:slide 3s';
    this.addImage = item.image;
    this.addName = item.name;
    this.idItem = item.id;
    this.itemCore = item;
    // this.backgroundImage = `background-image: url(${item.image});
    //                         background-size: cover;
    //                         background-position: center; transition: .3s all ease`;
  }

  leaveitem() {
    this.a = false;
  }

  addCart(product: any) {
    this.store.dispatch(increment({ payload: this.count }));
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

    if (product.id in this.cart_image) {
      this.cart_image[product.id].soLuong += 1;
    } else {
      this.cart_image[product.id] = {
        idNguoiDung: this.user.id,
        idThucAn: product.id,
        name: product.name,
        soLuong: 1,
        donGia: product.price,
        image: product.image,
        cate: product.idLoai.name,
      };
    }
    this.cookie.set('cart-image-foodapp', JSON.stringify(this.cart_image));
  }
}
