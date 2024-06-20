import { inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import Swal from "sweetalert2";

export const CanActivateCheckin = () => {
  const cookie = inject(CookieService);
  const router = inject(Router);
  const route = inject(ActivatedRoute);

  if (cookie.check('access')) {
    let idBan = parseInt(route.snapshot.paramMap.get('idBan') as any);
    const us = cookie.get('access')
    if (us === 'false') {
      router.navigate([`ban/${idBan}`])
      return true;
    } else {
      return false;
    }
  }
  return false;
};
