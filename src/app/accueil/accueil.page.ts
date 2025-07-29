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
    this.reqService.check_auth().subscribe(
      async () => {
        this.router.navigateByUrl('/home');
      },
      async () => {
        this.router.navigateByUrl('/tuto');
      }
    );

  }

}
