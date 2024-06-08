import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { MyUserService } from './Service/my-user.service';
import { MySpinnerComponent } from './layout/my-spinner/my-spinner.component';
import { StoreModule } from '@ngrx/store';
import { CounterReducer } from './Reducer/MyCartCounterState/counter.reducer';
import { MyScrollDirective } from './test/my-scroll.directive';
import { CartComponent } from './component/cart/cart.component';
import { MyCartService } from './Service/my-cart.service';
import { UserReducer } from './Reducer/MyUserState/state.reducer';
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
import { authReducer } from './Reducer/MyUserState/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffect } from './Reducer/MyUserState/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './Reducer/Global';
import { ChatbotComponent } from './chatbot/chatbot.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { OwnerComponent } from './component/owner/owner.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableDetailComponent } from './component/owner/TableDetail/table-detail/table-detail.component';
import { ChartComponent } from './component/owner/Chart/chart/chart.component';
import { ChartModule } from 'angular-highcharts';
import { ChartMonthComponent } from './component/owner/Chart/chart-month/chart-month.component';
import { CharMonthYearComponent } from './component/owner/Chart/char-month-year/char-month-year.component';
import { ChartCommentComponent } from './component/owner/Chart/chart-comment/chart-comment.component';
import { DetailChartCommentComponent } from './component/owner/Chart/chart-comment/detail-chart-comment/detail-chart-comment.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ChatComponent } from './component/chat/chat.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { SingleChatComponent } from './component/chat/singleChat/single-chat/single-chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { BuubleChatComponent } from './component/buuble-chat/buuble-chat.component';
// import { metaReducers, reducers } from './Reducer/Global';

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
    DanhGiaComponent,
    ChatbotComponent,
    FoodDetailComponent,
    OwnerComponent,
    TableDetailComponent,
    ChartComponent,
    ChartMonthComponent,
    CharMonthYearComponent,
    ChartCommentComponent,
    DetailChartCommentComponent,
    ChatComponent,
    SingleChatComponent,
    BuubleChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule,
    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'angularchatapp-9bac8',
    //     appId: '1:963489551945:web:396f47bc73be2f55e09198',
    //     storageBucket: 'angularchatapp-9bac8.appspot.com',
    //     apiKey: 'AIzaSyDNkQ2JWo-d9Z-_dyMjtGftZ7TG1V79fbw',
    //     authDomain: 'angularchatapp-9bac8.firebaseapp.com',
    //     messagingSenderId: '963489551945',
    //     measurementId: 'G-WKVH1WDGSR',
    //   })
    // ),
    // provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),

    ReactiveFormsModule,
    HttpClientModule,
    // StoreModule.forRoot({counter: CounterReducer, auth: authReducer}),
    StoreModule.forRoot(reducers, { metaReducers }),
    NgxPaginationModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffect]),
    SocialLoginModule,
    GoogleSigninButtonModule,
    TabsModule.forRoot(),
    ChartModule,
    ModalModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp({
      projectId: 'angularchatapp-9bac8',
      appId: '1:963489551945:web:396f47bc73be2f55e09198',
      storageBucket: 'angularchatapp-9bac8.appspot.com',
      apiKey: 'AIzaSyDNkQ2JWo-d9Z-_dyMjtGftZ7TG1V79fbw',
      authDomain: 'angularchatapp-9bac8.firebaseapp.com',
      messagingSenderId: '963489551945',
      measurementId: 'G-WKVH1WDGSR',
    }),

  ],
  providers: [
    CookieService,
    MyCartService,
    DatePipe,
    MyUserService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '708090744448-i1iao1kj4sqj27ktlbt5f9k9aqh3sa3l.apps.googleusercontent.com',
              {
                oneTapEnabled: false,
                prompt: 'consent',
              }
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1464142041188880'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angularchatapp-9bac8',
        appId: '1:963489551945:web:396f47bc73be2f55e09198',
        storageBucket: 'angularchatapp-9bac8.appspot.com',
        apiKey: 'AIzaSyDNkQ2JWo-d9Z-_dyMjtGftZ7TG1V79fbw',
        authDomain: 'angularchatapp-9bac8.firebaseapp.com',
        messagingSenderId: '963489551945',
        measurementId: 'G-WKVH1WDGSR',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
