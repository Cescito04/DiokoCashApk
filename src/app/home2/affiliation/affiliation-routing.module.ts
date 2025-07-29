import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffiliationPage } from './affiliation.page';

const routes: Routes = [
  {
    path: '',
    component: AffiliationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliationPageRoutingModule {}
