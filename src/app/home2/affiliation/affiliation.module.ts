import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffiliationPageRoutingModule } from './affiliation-routing.module';

import { AffiliationPage } from './affiliation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffiliationPageRoutingModule
  ],
  declarations: [AffiliationPage]
})
export class AffiliationPageModule {}
