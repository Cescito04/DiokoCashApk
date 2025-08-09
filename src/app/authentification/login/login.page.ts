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
    private router: Router,
    private modalCtrl: ModalController) { }
form = new FormGroup({
email: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
password: new FormControl('', [Validators.required]),

})
  ngOnInit() {
  }

  ionViewDidEnter(){
    // Vérifier si l'utilisateur est déjà connecté
    const authCheck = this.auth.check_auth();
    if (authCheck) {
      authCheck.subscribe(
        async () => {
          // Si déjà connecté, rediriger vers home
          this.router.navigateByUrl('home');
        },
        async (error) => {
          console.log('Utilisateur non connecté, rester sur la page login');
        }
      );
    } else {
      console.log('Pas de token, rester sur la page login');
    }
  }

  async confirm(){
    const loading = await this.loadingCtrl.create({message: 'En cours...'});
    await loading.present();
    this.auth.login(this.form.value).subscribe(
      async (data: any) => {
        loading.dismiss();
        console.log('=== DEBUG CONNEXION RÉUSSIE ===');
        console.log('Réponse du serveur:', data);
        console.log('Token reçu:', data['token']);
        
        localStorage.removeItem('token');
        localStorage.setItem('token',data['token']);
        
        console.log('Token sauvegardé dans localStorage:', localStorage.getItem('token'));
        console.log('=== FIN DEBUG CONNEXION ===');
        
        // Vérifier le statut utilisateur
        this.auth.check_auth().subscribe(async (user: any) => {
          // Reset des statuts ID locaux à chaque nouvelle session utilisateur
          localStorage.removeItem('id_verification_status');
          localStorage.removeItem('rejection_reason');
          // Sauvegarder les données utilisateur
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('/');
        });
      },
      async (error) => {
        console.log('=== ERREUR DE CONNEXION ===');
        console.log('Erreur:', error);
        console.log('Status:', error.status);
        console.log('Message:', error.error);
        console.log('=== FIN ERREUR ===');
        
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
