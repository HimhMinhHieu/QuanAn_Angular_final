import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { increment } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() u!: any;
  public foods: any = [];
  user: any = [];
  count: number = 1;
  loading!: any;
  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;
  private carts: any = {};
  cart_image: any = {};

  quantity: number = 1;
  hFood: boolean = false;

  //comments

  noiDung = new FormControl('');
  danhGia = new FormControl('');
  comment!: any;
  cont: any;
  huser!: any;
  loadingComment: any = true;
  chiNhanh:any = 4;

  constructor(
    private apis: ApiService,
    private cookie: CookieService,
    private store: Store<{ counter: { counter: number } }>,
    private router: Router,
    private cartService: MyCartService,
    private datePipe: DatePipe,
    private authAPI: AuthApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    // this.apis.get(endpoints.foods).subscribe((data) => {
    //   this.foods = data
    //   this.loading = false
    //   // this.totalProduct = data.length;
    // })
    let data = await this.apis.getFood(endpoints.foods);
    this.foods = data;
    if (this.foods !== null) this.loading = false;
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

    // this.apis.get(endpointsAuth.comments(4)).subscribe((data) => {
    //   this.comment = data;
    //   console.log(this.comment);
    // });

    this.huser = this.cookie.check('user');
    // console.log(this.user);
  }

  //comments
  get content() {
    return this.noiDung.value;
  }

  getCommentCreatedDate(comment: any) {
    return this.datePipe.transform(
      comment.createdDate,
      'dd/MM/yyyy, HH:mm',
      'vi'
    );
  }

  onChange() {
    this.cont = this.noiDung.value;
    console.log(this.noiDung.value);
  }

  addComment(idThucAn: any) {
    // console.log(this.cont)
    this.authAPI
      .post(endpointsAuth.addcomment, {
        noiDung: this.cont,
        idChiNhanh: 4,
        danhGia: this.danhGia.value,
        idNguoiDung: this.user.id,
        idThucAn: idThucAn,
      })
      .subscribe(async (data) => {
        // this.comment = Object.values(this.comment).unshift([data, ...this.comment])
        // this.authAPI.get(endpointsAuth.comments(4)).subscribe((data) => {
        //   this.comment = data;
        //   // console.log(this.comment);
        // });
        let dataCommentFood = await this.apis.getASYNC(
          endpoints.get_food_comments(idThucAn)
        );
        if (dataCommentFood !== null) {
          this.loadingComment = false;
          this.comment = dataCommentFood;
        }
        if (dataCommentFood === null) {
          this.loadingComment = true;
        }
        console.log(data);
        this.apis.postASYNC(endpoints.post_sentiment, {
          noiDung: this.cont,
          idThucAn: idThucAn,
          idNguoiDung: this.user.id
        });
      });
  }

  //detailFood
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
    console.log(this.quantity);
  }

  //addCart
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
        cate: product.idLoai.name
      };
    }
    this.cookie.set('cart-image-foodapp', JSON.stringify(this.cart_image));
  }

  addCartDetail(product: any) {
    this.store.dispatch(increment({ payload: this.quantity }));

    // console.log(product.image);
    // console.log(this.quantity);
    if (this.carts !== null) {
      if (product.id in this.carts) {
        this.carts[product.id].soLuong += this.quantity;
      } else {
        this.carts[product.id] = {
          idNguoiDung: this.user.id,
          idThucAn: product.id,
          name: product.name,
          soLuong: this.quantity,
          donGia: product.price,
        };
      }
      this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
    }

    if (this.cart_image !== null) {
      if (product.id in this.cart_image) {
        this.cart_image[product.id].soLuong += this.quantity;
      } else {
        this.cart_image[product.id] = {
          idNguoiDung: this.user.id,
          idThucAn: product.id,
          name: product.name,
          soLuong: this.quantity,
          donGia: product.price,
          image: product.image,
          cate: product.idLoai.name
        };
      }
      this.cookie.set('cart-image-foodapp', JSON.stringify(this.cart_image));
    }
  }

  async getFoodComment(idThucAn: any) {
    let dataCommentFood = await this.apis.getASYNC(
      endpoints.get_food_comments(idThucAn)
    );
    if (dataCommentFood !== null) {
      this.loadingComment = false;
      this.comment = dataCommentFood;
    }
    if (dataCommentFood === null) {
      this.loadingComment = true;
    }
  }

  gotoDatBan() {
    this.router.navigate(['/datban', this.chiNhanh])
  }
  // detailFood(product: any)
  // {
  //   // this.store.dispatch(increment({ payload: this.count }));
  //   if (product.id in this.carts) {

  //   } else {
  //     this.carts[product.id] = {
  //       idNguoiDung: this.user.id,
  //       idThucAn: null,
  //       name: null,
  //       soLuong: null,
  //       donGia: null
  //     };
  //   }
  //   this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
  //   this.router.navigate(['/menu', product.id])
  // }

}
