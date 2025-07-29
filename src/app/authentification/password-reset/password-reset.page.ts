import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  etape = 1;
  form2;
  recto_text = "Choisir un fichier";
  verso_text = "Choisir un fichier";
  token;
  le_form;
  class_pays;
  pays = "sn";
  indicatif = 221;
  constructor(private auth: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private router: Router) { }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    pays: new FormControl(''),
  });

  form_otp = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });


  ngOnInit() {
    this.etape = 1;
  }

  ionViewDidEnter(){
    this.auth.check_auth().subscribe(
      async () => {
        this.router.navigateByUrl('home');
      },
      async () => {

      }
    );

  }

  etape2(){
    this.etape = 2;
    this.form2 = new FormGroup({
      name: new FormControl(this.form.value['name']),
      email: new FormControl(this.form.value['email']),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),

    });
  }

  previous(code){
    this.etape = code;
  }


  async confirm(){
    this.form.value.pays = this.pays;
    const loading = await this.loadingCtrl.create({message: 'En cours...'});
    await loading.present();
      this.auth.check_user_reset(this.form.value).subscribe(
        async (data: string) => {
          if (data['token']) {
            loading.dismiss();
            this.etape = 4;   
            this.token = data['token'];       
          } else{
            const toast = await this.toastCtrl.create({message: data['message'], duration : 3000 , color: 'dark'});
            toast.present();
            loading.dismiss();
          }
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur...", buttons: ['OK']});
          alert.present();
          loading.dismiss();
        }
      );
  }

  async confirm_otp(){

    this.le_form = new FormGroup({
      otp: new FormControl(this.form_otp.value.otp),
      token: new FormControl(this.token),
      email: new FormControl(this.form.value.email)
    });
    
    const loading = await this.loadingCtrl.create({message: 'En cours...'});
    await loading.present();
      this.auth.verif_otp(this.le_form.value).subscribe(
        async (data: string) => {
          if (data['token']) {
            loading.dismiss();
            this.etape = 3;
          } else{
            const toast = await this.toastCtrl.create({message: data['message'], duration : 3000 , color: 'dark'});
            toast.present();
            loading.dismiss();
          }
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur...", buttons: ['OK']});
          alert.present();
          loading.dismiss();
        }
      );
  }

  async confirm2(){
    const loading = await this.loadingCtrl.create({message: 'En cours...'});
    await loading.present();
      this.auth.reset_password(this.form.value).subscribe(
        async (data: string) => {
          localStorage.removeItem('token');
          if (data['token']) {
            loading.dismiss();
            this.etape = 2;            
          } else{
            const toast = await this.toastCtrl.create({message: data['message'], duration : 3000 , color: 'dark'});
            toast.present();
            loading.dismiss();
          }
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur...", buttons: ['OK']});
          alert.present();
          loading.dismiss();
        }
      );
  }

  list_pays(){
    if (this.class_pays == null) {
      this.class_pays = 'vide';
    } else{
      this.class_pays = null;
    }
    event.stopPropagation();
  }

  set_pays(pays,indicatif){
    this.pays = pays;
    this.indicatif = indicatif;
  }

  out(){
    this.class_pays = null;
    event.stopPropagation();
    }

  set_recto(){
    this.recto_text = this.form.value.cni_recto;
    this.recto_text = this.recto_text.split(/(\\|\/)/g).pop()
  }

  set_verso(){
    this.verso_text = this.form.value.cni_verso;
    this.verso_text = this.verso_text.split(/(\\|\/)/g).pop()
  }

}
