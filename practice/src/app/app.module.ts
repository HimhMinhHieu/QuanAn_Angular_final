import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { MyUserService } from './Service/my-user.service';
import { MySpinnerComponent } from './layout/my-spinner/my-spinner.component';
import { StoreModule } from '@ngrx/store';
import { CounterReducer } from './Reducer/MyCartCounterReducer/counter.reducer';
import { MyScrollDirective } from './test/my-scroll.directive';
import { CartComponent } from './component/cart/cart.component';
import { MyCartService } from './Service/my-cart.service';
import { UserReducer } from './Reducer/MyUserReducer/state.reducer';
import { DatbanComponent } from './component/datban/datban.component';
import { FormDatBanComponent } from './component/form-dat-ban/form-dat-ban.component';
import { DatmonOfflineComponent } from './component/datmon-offline/datmon-offline.component';
import { ChonBanComponent } from './component/chon-ban/chon-ban.component';
import { CartOffComponent } from './component/cart-off/cart-off.component';
import { Page404Component } from './component/page404/page404.component';
import { IntroduceComponent } from './component/introduce/introduce.component';
import { MenuComponent } from './component/menu/menu.component';
import { ContactComponent } from './component/contact/contact.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ThongTinCaNhanComponent } from './component/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { DanhGiaComponent } from './component/danh-gia/danh-gia.component';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    MySpinnerComponent,
    MyScrollDirective,
    CartComponent,
    DatbanComponent,
    FormDatBanComponent,
    DatmonOfflineComponent,
    ChonBanComponent,
    CartOffComponent,
    Page404Component,
    IntroduceComponent,
    MenuComponent,
    ContactComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ThongTinCaNhanComponent,
    DanhGiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({counter: CounterReducer}),
    NgxPaginationModule
    ],
  providers: [CookieService, MyCartService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
