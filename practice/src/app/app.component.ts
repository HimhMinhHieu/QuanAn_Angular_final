import { Component, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  user!:any
 constructor(private cookie: CookieService) {
  if(this.cookie.check('user') === true)
    {
      this.user = JSON.parse(this.cookie.get('user'))
    }
  // if(this.cookie.check('cart') === true)
  // {
  //   this.cart = JSON.parse(this.cookie.get('cart'))
  // }
 }

  ngOnInit() {

  }

}
