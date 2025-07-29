import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private reqService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.reqService.check_auth().subscribe(
      async () => {
        this.router.navigateByUrl('home/tabs/tab1');
      },
      async () => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
      }
    );

  }

}
