import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements OnInit {

  constructor(private reqService : AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    const authCheck = this.reqService.check_auth();
    if (authCheck) {
      authCheck.subscribe(
        async () => {
          this.router.navigateByUrl('home');
        },
        async (error) => {
          console.log('Erreur d\'authentification dans tuto:', error);
        }
      );
    }
  }

}
