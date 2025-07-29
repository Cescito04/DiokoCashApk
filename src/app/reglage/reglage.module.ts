import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglagePageRoutingModule } from './reglage-routing.module';

import { ReglagePage } from './reglage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReglagePageRoutingModule
  ],
  declarations: [ReglagePage]
})
export class ReglagePageModule {}
