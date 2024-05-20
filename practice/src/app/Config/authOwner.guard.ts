import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

export const CanActivateOwner = () => {
  const cookie = inject(CookieService);
  const router = inject(Router);

  if (cookie.check('user')) {
    const us = JSON.parse(cookie.get('user'));
    if (us.vaiTro === 'OWNER') {

      return true;
    } else {
      Swal.fire({
        title: "Quyền truy cập thất bại",
        text: "Trang này bạn không được phép truy cập rất xin lỗi về vấn đề này",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Về Trang Chủ"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Trang sẽ chuyển trong giây lát",
            showConfirmButton: false,
            timer: 1500
          });
          router.navigate(['/home']);
        }
      });
      return false;
    }
  }
  return false;
};
