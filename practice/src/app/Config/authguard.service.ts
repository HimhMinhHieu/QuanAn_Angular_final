import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  router: Router = inject(Router);
  cookie: CookieService = inject(CookieService)
  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.cookie.check('user')) {
      Swal.fire({
        title: "Ooppss..",
        text: "Có vẻ như bạn chưa đăng nhập để thực hiện chức năng này. Hãy đăng nhập và quay trở lại sau nhé. Hoặc nếu bạn chưa có tài khoản thì có thể nhấp vào nút 'Đăng Ký' ở bên dưới nhé",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "green",
        confirmButtonText: `<i class="fa-regular fa-thumbs-up"></i> OK`,
        cancelButtonText: `<i class="fa-solid fa-user-plus"></i> Đăng Ký`,
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Trang sẽ chuyển trong giây lát",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            icon: "success",
            title: "Trang sẽ chuyển trong giây lát",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/register'])
        }
      });
      return false;
    } else return true;
  }
}
