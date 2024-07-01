import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import Swal from 'sweetalert2';

const SERVER_CONTEXT = '/quanan';
// const SERVER = 'http://localhost:8080';

const SERVER = 'https://onlyspringbootquanan-production.up.railway.app';

// const SERVER_SENTIMENT = 'http://127.0.0.1:5001';
const SERVER_SENTIMENT = 'https://pythonproj-sen.onrender.com/'

export const endpoints = {
  foods: `${SERVER}${SERVER_CONTEXT}/api/food/`,
  food_detail: (idFood: any) =>
    `${SERVER}${SERVER_CONTEXT}/api/food/${idFood}/`,
  add_food: `${SERVER}${SERVER_CONTEXT}/api/food/addfood/`,
  login: `${SERVER}${SERVER_CONTEXT}/api/login/`,
  register: `${SERVER}${SERVER_CONTEXT}/api/dangky/`,
  payOff: `${SERVER}${SERVER_CONTEXT}/api/payoffline/`,

  forgotPass: `${SERVER}${SERVER_CONTEXT}/api/quenmatkhau/`,
  googleSignIn: `${SERVER}${SERVER_CONTEXT}/api/login/google/`,
  cate: `${SERVER}${SERVER_CONTEXT}/api/cates/`,
  post_sentiment: `${SERVER_SENTIMENT}/getsentiment/`,
  sentiment_user: `${SERVER_SENTIMENT}/getrec/`,
  get_food_comments: (foodID: any) => `${SERVER}${SERVER_CONTEXT}/api/food/${foodID}/comments/`,

};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get(endpoint: string) {
    return this.http.get(endpoint);
  }

  async getFood(endpoint: string) {
    try {
      return await lastValueFrom(this.http.get(endpoint));
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getCate(endpoint: string) {
    try {
      return await lastValueFrom(this.http.get(endpoint));
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getASYNC(endpoint: string) {
    try {
      return await lastValueFrom(this.http.get(endpoint));
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getASYNC_tmp(endpoint: string) {
    try {
      return await lastValueFrom(this.http.get(endpoint, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }),
      }));
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  post(endpoint: string, body: any) {
    return this.http.post(endpoint, body, {
      responseType: 'text',
    });
  }

  async postASYNC(endpoint: string, body: any) {
    try {
      return await lastValueFrom(
        this.http.post(endpoint, body, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  forgot(endpoint: string, body: any) {
    return this.http.post(endpoint, body, {
      responseType: 'text',
      observe: 'response',
    });
  }

  login(endpoint: string, body: any) {
    return this.http
      .post(endpoint, body, {
        responseType: 'text',
      })
      .pipe(catchError(this.getErrorHandler));
  }

  put(endpoint: string, body: any) {
    return this.http.put(endpoint, body);
  }

  delete(endpoint: string) {
    return this.http.delete(endpoint);
  }

  getErrorHandler(error: HttpErrorResponse) {
    let messageError = 'Something wrong';
    switch (error.status) {
      case 400:
        Swal.fire({
          icon: 'error',
          title: 'SAI THÔNG TIN TÀI KHOẢN HOẶC MẬT KHẨU.',
          text: 'Xin vui lòng nhập lại thông tin tài khoản và mật khẩu !',
        });
        messageError = 'INVALID';
        break;
    }
    return throwError(() => new Error(messageError));
  }
}
