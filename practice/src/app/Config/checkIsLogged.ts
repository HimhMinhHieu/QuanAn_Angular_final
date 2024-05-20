import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

export const CanActivateLogged = () => {
  const cookie = inject(CookieService);
  const router = inject(Router);

  if (cookie.check('user')) {
    Swal.fire({
      title: 'Logged in',
      text: 'Bạn đã đăng nhập rồi mà',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Về Trang Chủ',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Trang sẽ chuyển trong giây lát',
          showConfirmButton: false,
          timer: 1500,
        });
        router.navigate(['/home']);
      }
    });
    return false;
  }
  return true;
};
