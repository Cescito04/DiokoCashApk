import { HttpClientModule } from '@angular/common/http';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdVerificationModalComponent } from './id-verification-modal/id-verification-modal.component';
import { IdVerificationOverlayComponent } from './id-verification-overlay/id-verification-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    IdVerificationModalComponent,
    IdVerificationOverlayComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgxDatatableModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NavParams],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
