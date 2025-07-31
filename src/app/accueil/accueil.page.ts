import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage {

  constructor(private reqService : AuthService,
              private router: Router) { }

  ionViewDidEnter(){
    const authCheck = this.reqService.check_auth();
    if (authCheck) {
      authCheck.subscribe(
        async () => {
          this.router.navigateByUrl('/home');
        },
        async (error) => {
          console.log('Erreur d\'authentification:', error);
          if (error.status === 401) {
            // Token expiré ou invalide, rediriger vers login
            this.reqService.logout();
          } else {
            // Autre erreur, rediriger vers tuto
            this.router.navigateByUrl('/tuto');
          }
        }
      );
    } else {
      // Pas de token, rediriger vers tuto
      this.router.navigateByUrl('/tuto');
    }
  }

}
