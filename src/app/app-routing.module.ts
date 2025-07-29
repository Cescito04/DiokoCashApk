import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
    //loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentification/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'register',
    loadChildren: () => import('./authentification/register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home-conversion',
    loadChildren: () => import('./conversion/home-conversion/home-conversion.module').then( m => m.HomeConversionPageModule)
  },
  {
    path: 'tuto',
    loadChildren: () => import('./tuto/tuto.module').then( m => m.TutoPageModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./conversion/transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./conversion/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./home-credit/credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'reglage',
    loadChildren: () => import('./reglage/reglage.module').then( m => m.ReglagePageModule)
  },
  {
    path: 'factures',
    loadChildren: () => import('./factures/factures.module').then( m => m.FacturesPageModule)
  },
  {
    path: 'multiple',
    loadChildren: () => import('./multiple-conversion/multiple-conversion.module').then( m => m.MultipleConversionPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./authentification/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'affiliation',
    loadChildren: () => import('./home2/affiliation/affiliation.module').then( m => m.AffiliationPageModule)
  },
  {
    path: 'crypto-home',
    loadChildren: () => import('./home3/crypto-home/crypto-home.module').then( m => m.CryptoHomePageModule)
  },
  {
    path: 'crypto',
    loadChildren: () => import('./home3/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'crypto-valider',
    loadChildren: () => import('./home3/crypto/crypto.module').then( m => m.CryptoPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./home3/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'crypto-confirm',
    loadChildren: () => import('./home3/crypto-confirm/crypto-confirm.module').then( m => m.CryptoConfirmPageModule)
  },
  {
    path: 'histo-crypto',
    loadChildren: () => import('./home3/histo-crypto/histo-crypto.module').then( m => m.HistoCryptoPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
