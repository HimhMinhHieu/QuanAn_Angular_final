import { CanActivateLogged } from './Config/checkIsLogged';
import { NgModule, Component } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ThongTinCaNhanComponent } from './component/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { DanhGiaComponent } from './component/danh-gia/danh-gia.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { OwnerComponent } from './component/owner/owner.component';
import { AuthguardService } from './Config/authguard.service';
import { CanActivateOwner } from './Config/authOwner.guard';
import { ChatComponent } from './component/chat/chat.component';
import { MainAppAngularComponent } from './component/main-app-angular/main-app-angular.component';
import { FoodOffDetailComponent } from './component/food-off-detail/food-off-detail.component';
import { animation } from '@angular/animations';
import { NewCartOffComponent } from './component/new-cart-off/new-cart-off.component';
import { OfferOfflineComponent } from './component/offer-offline/offer-offline.component';
import { DetailOfferComponent } from './component/offer-offline/detail-offer/detail-offer.component';
import { PaymentComponent } from './component/payment/payment.component';
import { QRCodeSelectComponent } from './component/qrcode-select/qrcode-select.component';
import { QRCodeCheckInComponent } from './component/qrcode-check-in/qrcode-check-in.component';
import { CanActivateCheckin } from './Config/checkIn';
import { ThankYouComponent } from './component/thank-you/thank-you.component';
import { NewMenuComponent } from './component/new-menu/new-menu.component';
import { NhaBepComponent } from './component/nha-bep/nha-bep.component';
import { NewCartOnlineComponent } from './component/new-cart-online/new-cart-online.component';
import { NewLoginComponent } from './component/new-login/new-login.component';
import { NewRegisterComponent } from './component/new-register/new-register.component';
import { NewDatBanOnlineComponent } from './component/new-dat-ban-online/new-dat-ban-online.component';
import { NewFormDatBanComponent } from './component/new-form-dat-ban/new-form-dat-ban.component';
import { MenuPreviewComponent } from './component/menu-preview/menu-preview.component';
import { NewUserDetailComponent } from './component/new-user-detail/new-user-detail.component';
import { NewContactUsComponent } from './component/new-contact-us/new-contact-us.component';


const routes: Routes = [
  {path: '', component: MainAppAngularComponent, children: [
    {path: '', redirectTo: '/home', title: "Welcome to Nhoam-Nhoam",pathMatch: 'full' },
    {path: 'home', component: HomeComponent, title: "Welcome to Nhoam-Nhoam"},
    {path: 'login', component: NewLoginComponent, title: "Login", canActivate: [CanActivateLogged]},
    {path: 'register', component: NewRegisterComponent, title: "Sign Up", canActivate: [CanActivateLogged]},
    {path: 'cart', component: NewCartOnlineComponent, title: "Cart", canActivate: [AuthguardService]},
    {path: 'datban/:idChiNhanh', title:"Table Booking", component: NewDatBanOnlineComponent, canActivate: [AuthguardService]},
    {path: 'datban/:idChiNhanh/ban/:idBan',title:"Table Booking", component: NewFormDatBanComponent, canActivate: [AuthguardService]},
    {path: 'chonban', component: ChonBanComponent},

    {path: 'cartoff', component: CartOffComponent},
    {path: 'introduce', component: IntroduceComponent, title: "Introduce"},
    {path: 'menu', component: NewMenuComponent, title: "Menu"},
    {path: 'menu/:idFood', component: FoodDetailComponent},
    {path: 'contact', component: NewContactUsComponent, title: "Contact"},
    {path: 'forgot', component: ForgotPasswordComponent, title: "Forgot Password"},
    {path: 'changepw', component: ChangePasswordComponent, title: "Change Password"},
    {path: 'detail', component: NewUserDetailComponent, title: "Information"},
    {path: ':storeId/comments', component: DanhGiaComponent},
    {path: 'chatbot', component: ChatbotComponent},
    {path: 'owner', component: OwnerComponent, title: "Owner", canActivate: [CanActivateOwner]},
    {path: 'chat', component: ChatComponent, title: "Chat"},
    {path: 'menupreview', component: MenuPreviewComponent, title:'Menu'},
    {path: 'test2', component: NewUserDetailComponent, title:"Thông tin cá nhân"}
    // {path: 'test3', component: NewLoginComponent, title: 'Login'},
    // {path: 'test4', component: NewRegisterComponent, title: 'Register'},
    // {path: 'test5', component: NewDatBanOnlineComponent, title: 'Table Booking'},
    // {path: 'test6', component: NewFormDatBanComponent, title: 'Table Booking'},
  ]},
  {path: 'ban/:idBan/QRCode', component: QRCodeSelectComponent, data: {animation: 'QRCode'}},
  {path: 'ban/:idBan/CheckIn', component: QRCodeCheckInComponent, data: {animation: 'CheckIn'}},
  {path: 'ban/:idBan', component: DatmonOfflineComponent, data: {animation: 'test'}},
  {path: 'ban/:idBan/food/:idFood', component: FoodOffDetailComponent, data: {animation: 'FoodDetailPageOff'}},
  {path: 'ban/:idBan/cartoffpay', component: NewCartOffComponent, data: {animation: 'CartOff'}},
  {path: 'ban/:idBan/offer', component: OfferOfflineComponent, data: {animation: 'OfferOffline'}},
  {path: 'ban/:idBan/offer/offer-detail', component: DetailOfferComponent, data: {animation: 'OfferDetail'}},
  {path: 'ban/:idBan/payment', component: PaymentComponent, title: "Bill", data: {animation: "Billing"}},
  {path: 'thankyou', component: ThankYouComponent, title: 'Thank You', data: {animation: 'ThankYou'}},
  {path: 'nhabep', component: NhaBepComponent},
  // {path: 'test2', component: NewCartOnlineComponent},
  {path: '**', component: Page404Component, title: "404 Error"},

];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled'
  // ...any other options you'd like to use
};


@NgModule({
  imports: [RouterModule.forRoot(routes,  routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
