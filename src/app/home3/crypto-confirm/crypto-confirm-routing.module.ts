import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CryptoConfirmPage } from './crypto-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: CryptoConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoConfirmPageRoutingModule {}
