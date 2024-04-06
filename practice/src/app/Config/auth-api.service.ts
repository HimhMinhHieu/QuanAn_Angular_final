import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const SERVER_CONTEXT = '/quanan';
const SERVER = 'http://localhost:8080';

export const endpointsAuth = {
  currentUser: `${SERVER}${SERVER_CONTEXT}/api/current-user/`,
  pay: `${SERVER}${SERVER_CONTEXT}/api/pay/`,
  datban: `${SERVER}${SERVER_CONTEXT}/api/datban/`,
  payOff: `${SERVER}${SERVER_CONTEXT}/api/payoffline/`,
  changePassword: `${SERVER}${SERVER_CONTEXT}/api/doimatkhau/`,
  comments: (storeId: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/stores/${storeId}/comments/`,
  addcomment: `${SERVER}${SERVER_CONTEXT}/api/comments/`,
};

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get(endpoint: string) {
    return this.http.get(endpoint, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('token'),
      }),
    });
  }

  post(endpoint: string, body: any) {
    return this.http.post(endpoint, body, {
      observe: 'response',
      // headers: {
      //   Authorization: this.cookieService.get('token'),
      // },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('token'),
      }),
    });
  }

  put(endpoint: string, body: any) {
    return this.http.put(endpoint, body, {
      // headers: {
      //   Authorization: this.cookieService.get('token'),
      // },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('token'),
      }),
    });
  }

  delete(endpoint: string) {
    return this.http.delete(endpoint, {
      // headers: {
      //   Authorization: this.cookieService.get('token'),
      // },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.cookieService.get('token'),
      }),
    });
  }
}
