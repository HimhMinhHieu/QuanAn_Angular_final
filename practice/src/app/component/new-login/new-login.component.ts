import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { loginState } from 'src/app/Reducer/MyUserState/auth.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
})
export class NewLoginComponent implements OnInit {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  authApi = inject(AuthApiService);
  store = inject(Store);
  authService = inject(SocialAuthService);
  router = inject(Router);
  apis = inject(ApiService);
  cookie = inject(CookieService);

  loginForm = new FormGroup({
    taiKhoan: new FormControl('', [Validators.required]),
    matKhau: new FormControl('', [Validators.required]),
  });
  user!: any;
  loggedIn!: any;

  ngOnInit(): void {
    if (this.cookie.check('user') === false) {
      this.authService.authState.subscribe({
        next: (result) => {
          console.log(result);
          console.log(JSON.stringify(this.user));
          if (result !== null) {
            try {
              this.user = {
                email: `${result.email}`,
                firstName: `${result.firstName}`,
                lastName: `${result.lastName}`,
                avatar: `${result.photoUrl}`,
              };
              this.apis
                .post(endpoints.googleSignIn, this.user)
                .subscribe((data) => {
                  this.cookie.set('token', data.toString());
                  this.authApi
                    .get(endpointsAuth.currentUser)
                    .subscribe((data) => {
                      this.cookie.set('user', JSON.stringify(data));
                      this.store.dispatch(loginState.login({ user: data }));
                      console.log(this.cookie.check('user'));
                      this.router.navigate(['/']);
                    });
                });
            } catch (error) {
              console.log(error);
            }
          } else throw Error;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      try {
        this.apis
          .login(endpoints.login, this.loginForm.value)
          .subscribe((data) => {
            this.cookie.set('token', data.toString());
            // this.store.dispatch(login({token: data.toString()}))
            this.authApi.get(endpointsAuth.currentUser).subscribe((data) => {
              this.cookie.set('user', JSON.stringify(data));
              this.store.dispatch(loginState.login({ user: data }));

              // console.log(this.cookie.check('user'));

              Swal.fire({
                icon: 'success',
                title: 'Congratulations',
                text: 'Chúc mừng bạn đã đăng nhập thành công',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/']);
                }
              });
            });
          });

        // if(this.cookie.check('user') === true)
        // {
        //   this.router.navigate(['/']);
        //   alert("Bạn đã đăng nhập thành công")
        // } else
        // {
        //   alert("Hãy thử lại lần nữa")
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }

  get taiKhoan() {
    return this.loginForm.get('taiKhoan');
  }

  get matKhau() {
    return this.loginForm.get('matKhau');
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
