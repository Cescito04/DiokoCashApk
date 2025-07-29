import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CryptoHomePage } from './crypto-home.page';

const routes: Routes = [
  {
    path: '',
    component: CryptoHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoHomePageRoutingModule {}
