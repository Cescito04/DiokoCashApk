import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeConversionPage } from './home-conversion.page';

const routes: Routes = [
  {
    path: '',
    component: HomeConversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeConversionPageRoutingModule {}
