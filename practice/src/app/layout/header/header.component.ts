import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import introJs from 'intro.js';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { logout } from 'src/app/Reducer/MyUserReducer/state.action';
import { MyCartService } from 'src/app/Service/my-cart.service';
import { MyUserService } from 'src/app/Service/my-user.service';

export interface User {
  id: number,
    firstName: String,
    lastName: String,
    taiKhoan: String,
    matKhau: String,
    email: String,
    phone: String,
    avatar: String,
    vaiTro: String,
    active: boolean,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() u!:any;
  public user:any = [] || null;
  public hUser:any;
  carts: any = {}
  chiNhanh:any = 4
  idBan!: any
  constructor(
    private cookie:CookieService,
    private store:Store<{counter: {counter: number}}>,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  counterdisplay!: any;
  navStyle = "background-color:none;"
  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('idBan') as any)
    this.idBan = id
    console.log(this.idBan)
    if(this.cookie.check('user') === true){
      this.user = this.u;
      console.log(this.user)
    }else

    this.hUser = this.cookie.check('user')


      this.store.select('counter').subscribe(data => {
        // data.counter = this.cartService.countCart()
        this.counterdisplay = data.counter
      })
      console.log(this.cookie.check('cart'))

    // this.store.select('user').subscribe(data => {

    // })
    // window.addEventListener('scroll', this.onScroll);
  }

  logout() {
    this.cookie.deleteAll('/')
    this.store.dispatch(logout({payload: null}));
  }

  DatBan() {
    this.router.navigate(['/datban', this.chiNhanh])
  }

  Next()
  {
    this.router.navigate(['/chonban',this.idBan, 'cartOff'])
  }

  // onScroll() {
  //   this.scrollY = window.scrollY;

  //   if (scrollY > 337) {
  //     // Add a CSS class to the element
  //     this.elementRef.nativeElement.classList.add('bg-dark');
  //   } else {
  //     // Remove the CSS class from the element
  //     this.elementRef.nativeElement.classList.remove('bg-dark');
  //   }
  // }

  // onClick(){
  //   this.navStyle = "background-color:powderblue;"
  // }

  public tour()
  {
    introJs().setOptions({
      doneLabel: 'Hoàn Thành',
      prevLabel: 'Trở Về',
      nextLabel: 'Tiếp Tục',
      steps:[
        {
          title: 'Welcome',
          intro: '<div class="text-center">Chào mừng bạn tới với website của quán</div>',
        },
        {
          element: '#First',
          title: 'Header',
          intro: '<div class="text-center">Đây là nơi cung cấp để bạn có thể trải nghiệm website một cách thoải mái nhất</div>',
        },
        {
          element: '#Second',
          title: 'Giới Thiệu',
          intro: '<div class="text-center">Đây là mục Giới Thiệu, đây là nơi cho bạn cái nhìn tổng quan nhất về quán ăn của chúng tôi</div>',
        },
        {
          element: '#Third',
          title: 'Đăng Nhập',
          intro: '<div class="text-center">Nếu bạn là khách hay khách quen của quan thì đây chính là nơi bạn có thể truy cập là thành viên của quán để cập nhật những tin tức mới nhất về quán</div>',
        },
        {
          element: '#Forth',
          title: 'Đăng Ký',
          intro: '<div class="text-center">Nếu bạn là một khách hàng quan tâm sâu sắc đến quán và bạn muốn đăng ký làm hội viên để cập nhật tin tức của quán thì bạn có thể đăng ký ở đây</div>',
        },
        {
          element: '#Fifth',
          intro: '<div class="text-center">Giỏ Hàng là nơi bạn đã đặt món online</div>',
          title: 'Giỏ Hàng',
        },
        {
          element: '#Sixth',
          intro: '<div class="text-center">Thực Đơn là nơi bạn có thể biết được quán chúng tôi sẽ phục vụ những gì</div>',
          title: 'Thực Đơn',
        },
        // {
        //   element: '#Seventh',
        //   intro: '<div class="text-center">Tin Tức là nơi bạn có thể biết thêm về quán</div>',
        //   title: 'Tin Tức',
        // },
        {
          element: '#Eighth',
          intro: '<div class="text-center">Mọi thắc mắc về quán bạn có thể liên hệ chúng tôi tại đây</div>',
          title: 'Liên Hệ',
        },
        {
          element: '#Ninth',
          intro: '<div class="text-center">Nếu bạn có nhu cầu đặt bàn thì bạn có thể sử dụng dịch vụ này</div>',
          title: 'Đặt Bàn',
        },
        {
          element: '.Tenth',
          intro: '<div class="text-center">Các trang mạng xã hội</div>',
          title: 'Các trang mạng xã hội',
        },
        {
          element: '.Eleventh',
          intro: '',
          title: 'Hình Ảnh'
        }
      ]
    }).start();
  }
}
