import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CryptoHomePageRoutingModule } from './crypto-home-routing.module';

import { CryptoHomePage } from './crypto-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CryptoHomePageRoutingModule
  ],
  declarations: [CryptoHomePage]
})
export class CryptoHomePageModule {}
