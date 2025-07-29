import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeConversionPageRoutingModule } from './home-conversion-routing.module';

import { HomeConversionPage } from './home-conversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomeConversionPageRoutingModule
  ],
  declarations: [HomeConversionPage]
})
export class HomeConversionPageModule {}
