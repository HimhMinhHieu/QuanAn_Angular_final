import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { increment } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() u!: any
  public foods:any = [];
  user:any = [];
  count:number = 1;
  loading!: any
   p:number = 1
   itemPerPage: number = 4
  totalProduct!: any
  private carts: any = {};
  constructor(private apis: ApiService,
     private cookie: CookieService,
     private store:Store<{counter: {counter: number}}>,
     private cartService: MyCartService
     ){

   }

  ngOnInit(): void {
    this.loading = true
    this.apis.get(endpoints.foods).subscribe((data) => {
      this.foods = data
      this.loading = false
      // this.totalProduct = data.length;
    })
    if(this.cookie.check('user') === true){
      this.user = JSON.parse(this.cookie.get('user'))
    }

    console.log(this.user)
  }

  addCart(product: any)
  {
    this.store.dispatch(increment({ payload: this.count }));
    if (product.id in this.carts) {
      this.carts[product.id].soLuong += 1;
    } else {
      this.carts[product.id] = {
        idNguoiDung: this.user.id,
        idThucAn: product.id,
        name: product.name,
        soLuong: 1,
        donGia: product.price
      };
    }
    this.cookie.set('cart', JSON.stringify(this.carts));
  }
}
