import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { CartComponent } from './component/cart/cart.component';
import { DatbanComponent } from './component/datban/datban.component';
import { FormDatBanComponent } from './component/form-dat-ban/form-dat-ban.component';
import { ChonBanComponent } from './component/chon-ban/chon-ban.component';
import { DatmonOfflineComponent } from './component/datmon-offline/datmon-offline.component';
import { CartOffComponent } from './component/cart-off/cart-off.component';
import { Page404Component } from './component/page404/page404.component';
import { IntroduceComponent } from './component/introduce/introduce.component';
import { MenuComponent } from './component/menu/menu.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},
  {path: 'cart', component: CartComponent},
  {path: 'datban/:idChiNhanh', component: DatbanComponent},
  {path: 'datban/:idChiNhanh/ban/:idBan', component: FormDatBanComponent},
  {path: 'chonban', component: ChonBanComponent},
  {path: 'chonban/:idBan', component: DatmonOfflineComponent},
  {path: 'cartoff', component: CartOffComponent},
  {path: 'introduce', component: IntroduceComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: Page404Component}
  // {path: 'forgot', component: ForgotPasswordComponent},
  // {path: 'register', component: SigninComponent},
  // {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
