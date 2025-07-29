import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CryptoConfirmPageRoutingModule } from './crypto-confirm-routing.module';

import { CryptoConfirmPage } from './crypto-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CryptoConfirmPageRoutingModule
  ],
  declarations: [CryptoConfirmPage]
})
export class CryptoConfirmPageModule {}
