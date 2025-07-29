import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoCryptoPageRoutingModule } from './histo-crypto-routing.module';

import { HistoCryptoPage } from './histo-crypto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoCryptoPageRoutingModule
  ],
  declarations: [HistoCryptoPage]
})
export class HistoCryptoPageModule {}
