import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { login } from 'src/app/Reducer/MyUserReducer/state.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    taiKhoan: new FormControl('', [Validators.required]),
    matKhau: new FormControl('', [Validators.required])
  });

  constructor(
    private cookie:CookieService,
    private apis: ApiService,
    private authApi: AuthApiService,
    private router: Router,
    private store: Store,
  ) { }

  onSubmit() {
    if(this.loginForm.valid){
      try{
        this.apis.login(endpoints.login, this.loginForm.value).subscribe((data) => {
            this.cookie.set('token', data.toString())
            this.authApi.get(endpointsAuth.currentUser).subscribe((data) => {
              this.cookie.set('user', JSON.stringify(data))
              this.store.dispatch(login({payload: data}))
              console.log(this.cookie.check('user'))
              if(this.cookie.check('user') === true)
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Congratulations',
                  text: 'Chúc mừng bạn đã đăng nhập thành công',
                }).then((result) => {
                  if(result.isConfirmed)
                  {

                    this.router.navigate(['/']);
                  }
                })
              } else
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Xin lỗi bạn...',
                  text: 'Đã có lỗi xảy ra xin hãy thử lại'
                }).then((result) =>{
                  if(result.isConfirmed)
                  {
                    this.router.navigate(['/login']);
                  }
                })
              }
            })

        })

        // if(this.cookie.check('user') === true)
        // {
        //   this.router.navigate(['/']);
        //   alert("Bạn đã đăng nhập thành công")
        // } else
        // {
        //   alert("Hãy thử lại lần nữa")
        // }
      }catch(error)
      {
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

  private controlValueError(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
      if (control.value === null) {
        return null;
      }else {
        return {valuesInvalid: true}
      }

    }
  }
}
