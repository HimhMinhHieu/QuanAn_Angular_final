import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-new-user-detail',
  templateUrl: './new-user-detail.component.html',
  styleUrls: ['./new-user-detail.component.css']
})
export class NewUserDetailComponent implements OnInit{
  cookie = inject(CookieService)

  user!: any;

  ngOnInit(): void {
    this.user = JSON.parse(this.cookie.get('user'))
  }
}
