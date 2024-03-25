import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { decrement, update } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() c!:any
  carts!: any;
  hcarts!:any
  quantityControl = new FormControl();
  user!: any
  huser!: any
  constructor(private cartService: MyCartService,
     private router: Router,
     private cookie: CookieService,
     private store:Store<{counter: {counter: number}}>,
     private authApi: AuthApiService
     ) { }
  carts$!: Observable<any>;
  Object = Object;
  ngOnInit(): void {
    if(this.cookie.check('cart') === true){
      this.carts = JSON.parse(this.cookie.get('cart'))
      console.log(this.carts)
    }
    console.log(this.carts)
    this.hcarts = this.cookie.check('cart')
    if(this.cookie.check('user') === true)
    {
      this.user = JSON.parse(this.cookie.get('user'))
    }
    this.huser = this.cookie.check('user')
  }

  deleteItem(item: any)
  {
    this.store.dispatch(decrement({ payload: item.soLuong }))
    if(item.idThucAn in this.carts)
    {
        delete this.carts[item.idThucAn];
        this.cookie.set('cart', JSON.stringify(this.carts));

        return this.carts;
    }
  }

  update(value: any){
    this.cookie.set('cart', this.carts);
    let s = Object.values(this.carts).reduce((init:any, current: any) => init + current['soLuong'], 0)
    this.store.dispatch(update({ payload: value}))
    console.log(s)
  }

  pay()
  {
    console.log(JSON.stringify(this.carts))
    this.authApi.post(endpointsAuth.pay, this.carts).subscribe((res) => {
      this.carts = null
      this.cookie.delete('cart')
      this.store.dispatch(update({payload: 0}))
      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: 'Chúc mừng bạn đã thanh toán thành công',
      }).then((result) => {
        if(result.isConfirmed)
        {
          this.router.navigate(['/']);
        }
      })
    })
    //   this.carts = null
    //   this.cookie.delete('cart')
    //   this.store.dispatch(update({payload: 0}))
    // })
  }

  changeQuantity(item:any, event: Event)
  {

    // if(item.idThucAn in this.carts)
    // {
    //   this.cookie.set('cart', JSON.stringify(this.carts));
    //   this.carts = { ...this.carts, [item.idThucAn]: { ...this.carts[item.idThucAn], "soLuong": parseInt() } };
    //     console.log(this.carts)

    //     return this.carts;
    // }
  }
}
