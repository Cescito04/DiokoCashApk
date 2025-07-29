import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoCryptoPage } from './histo-crypto.page';

const routes: Routes = [
  {
    path: '',
    component: HistoCryptoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoCryptoPageRoutingModule {}
