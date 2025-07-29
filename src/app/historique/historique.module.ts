import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';
import { RegisterPageRoutingModule } from '../authentification/register/register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePageRoutingModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HistoriquePage]
})
export class HistoriquePageModule {}
