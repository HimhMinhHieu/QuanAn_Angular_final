import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';

const SERVER_CONTEXT = '/quanan';
// const SERVER = 'http://localhost:8080';

const SERVER = 'https://onlyspringbootquanan-production.up.railway.app';

export const endpointsAuth = {
  currentUser: `${SERVER}${SERVER_CONTEXT}/api/current-user/`,
  pay: `${SERVER}${SERVER_CONTEXT}/api/pay/`,
  datban: `${SERVER}${SERVER_CONTEXT}/api/datban/`,

  changePassword: `${SERVER}${SERVER_CONTEXT}/api/doimatkhau/`,
  comments: (storeId: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/stores/${storeId}/comments/`,
  addcomment: `${SERVER}${SERVER_CONTEXT}/api/comments/`,
  addFood: `${SERVER}${SERVER_CONTEXT}/api/food/addfood/`,
  deleteFood: (idFood: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/food/delete/${idFood}/`,
  patchFood: (idFood: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/food/patch/${idFood}/`,
  payOnline: `${SERVER}${SERVER_CONTEXT}/api/pay/pay_online/`,
  chiNhanh_detail: (idChiNhanh: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/chinhanh/${idChiNhanh}/`,
  stats: `${SERVER}${SERVER_CONTEXT}/api/stats/`,
  get_sentiment: `${SERVER}${SERVER_CONTEXT}/api/sentiment/`,
  patchFoodImage: (idFood: any) => `${SERVER}${SERVER_CONTEXT}/api/food/patchavatar/${idFood}/`,
  allFood: `${SERVER}${SERVER_CONTEXT}/api/foodall/`,
  chiNhanh: (idChiNhanh: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/ban/${idChiNhanh}/`,
  ban: (idBan: any) => `${SERVER}${SERVER_CONTEXT}/api/thongtinban/${idBan}/`,
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

  async getAPIAsync(endpoint: string) {
    try {
      return await lastValueFrom(
        this.http.get(endpoint, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.cookieService.get('token'),
          }),
        })
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAPIAsyncSentiment(endpoint: string) {
    try {
      return await lastValueFrom(
        this.http.get(endpoint, {
          headers: new HttpHeaders({
            Authorization: this.cookieService.get('token'),
          }),
        })
      );
    } catch (e) {
      console.log(e);
      return null;
    }
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

  patch(endpoint: string, body: any) {
    return this.http.patch(endpoint, body, {
      // headers: {
      //   Authorization: this.cookieService.get('token'),
      // },
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
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
