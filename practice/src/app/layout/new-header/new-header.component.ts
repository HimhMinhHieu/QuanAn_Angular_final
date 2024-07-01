import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { update } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { getCounter } from 'src/app/Reducer/MyCartCounterState/counter.selectors';
import { logoutState } from 'src/app/Reducer/MyUserState/auth.actions';
import { authUserSelector } from 'src/app/Reducer/MyUserState/auth.selectors';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.css'],
  host: {
    '(document:scroll)' : `onScrollDocument($event)`
  }
})
export class NewHeaderComponent implements OnInit {
  router = inject(Router);
  cookie = inject(CookieService);
  authService = inject(SocialAuthService);
  store = inject(Store);
  storeU = inject(Store);
  render = inject(Renderer2);
  el = inject(ElementRef);

  user$ = this.storeU.select(authUserSelector);
  chiNhanh:any = 4;
  counterdisplay!: any;
  avatar !: any;
  open :any = true;

  showScroll :any = true;

  user !: any;

  ngOnInit(): void {
    this.store.select(getCounter).subscribe(data => this.counterdisplay = data)
    if(this.cookie.check('user') === true){
      this.user = JSON.parse(this.cookie.get('user'));
    }
    this.avatar = this.el.nativeElement.querySelector('.img-avatar');
  }

  DatBan() {
    this.router.navigate(['/datban', this.chiNhanh])
  }

  logout() {
    if (this.cookie.check('user') === true) {
      this.authService.authState.subscribe({
        next: (result) => {
          console.log(result);
          console.log(JSON.stringify(this.user));
          if (result !== null) {
            try {
              this.authService.signOut()
            } catch (error) {
              console.log(error);
            }
          } else throw Error
        },
        error: (err) => {
          console.error(err);
        },
      });
    }

    this.open = true;
    this.cookie.deleteAll('/')
    this.store.dispatch(update({payload: 0}))
    // this.store.dispatch(logout({payload: null}));
    this.storeU.dispatch(logoutState());
    this.router.navigate(['/']);
  }

  showInfo() {
    this.open = !this.open
    this.avatar.classList.toggle('.user-func')
  }

  onScrollDocument(e: any) {
    e = e || window.event
    console.log(window.scrollY)
    if(window.scrollY >= 100) {
      this.showScroll = false;
    } else {
      this.showScroll = true;
    }
  }
}
