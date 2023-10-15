import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService, endpointsAuth } from '../Config/auth-api.service';
import { User } from '../layout/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class MyUserService {

  constructor(private cookie:CookieService, private apiAuth: AuthApiService) { }

  getUser() {
      return this.cookie.get('user');
  }
}
