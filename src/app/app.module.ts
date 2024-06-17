import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainCardsModule } from './components/main-cards/main-cards.module';
import { BalancesModule } from './components/balances/balances.module';
import { HistoryModule } from './components/history/history.module';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminInterceptor } from './interceptors/admin-interceptor.interceptor';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainCardsModule,
    BalancesModule,
    HistoryModule,
    NavbarComponent,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
