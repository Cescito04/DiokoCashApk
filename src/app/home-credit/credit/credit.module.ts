import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditPageRoutingModule } from './credit-routing.module';

import { CreditPage } from './credit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreditPage]
})
export class CreditPageModule {}
