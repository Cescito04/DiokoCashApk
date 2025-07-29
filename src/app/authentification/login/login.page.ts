import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { IdVerificationOverlayComponent } from '../../id-verification-overlay/id-verification-overlay.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showIdVerification = false;

  constructor(private auth: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private reqService: AuthService,
    private router: Router,
    private modalCtrl: ModalController) { }
form = new FormGroup({
email: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
password: new FormControl('', [Validators.required]),

})
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.reqService.check_auth().subscribe(
      async () => {
        this.router.navigateByUrl('home');
      },
      async () => {

      }
    );

  }

  async confirm(){
    const loading = await this.loadingCtrl.create({message: 'En cours...'});
    await loading.present();
    this.auth.login(this.form.value).subscribe(
      async (data: any) => {
        loading.dismiss();
        localStorage.removeItem('token');
        localStorage.setItem('token',data['token']);
        // Vérifier le statut utilisateur
        this.auth.check_auth().subscribe(async (user: any) => {
          // Sauvegarder les données utilisateur dans le localStorage
          localStorage.setItem('user', JSON.stringify(user));
          
          if (user.status !== 'id_verified' && user.status !== 'pending_id_review') {
            this.showIdVerification = true;
            // Ne pas naviguer immédiatement, attendre que l'utilisateur ferme l'overlay
          } else {
            this.router.navigateByUrl('/');
          }
        });
      },
      async () => {
        const alert = await this.toastCtrl.create({message: "Ces données ne correspondent pas à nos enregstrements...", duration: 3000, color: 'dark'});
        alert.present();
        loading.dismiss();
      }
    );
  }

  closeIdVerification() {
    this.showIdVerification = false;
    // Naviguer après avoir fermé l'overlay
    this.router.navigateByUrl('/');
  }
}
