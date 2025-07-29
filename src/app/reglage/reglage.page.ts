import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../authentification/auth.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-reglage',
  templateUrl: './reglage.page.html',
  styleUrls: ['./reglage.page.scss'],
})
export class ReglagePage implements OnInit {
  nom;
  vue;
  email;
  telephone;
  class1;
  contact;
  numeros;
  vu_num = 1;
  le_numero;
  message;
  message_2;
  le_otp;
  token;
  vu_pwd = 0;
  message_pt;
  indicatif;
  form1 = new FormGroup({
    ancien: new FormControl(null, [Validators.required]),
    nouveau: new FormControl(null, [Validators.required]),
    confirmation: new FormControl(null, [Validators.required])
  });

  form2 = new FormGroup({
    principal: new FormControl('', [Validators.required]),
    nouveau: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.maxLength(4)]),
    confirmation: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.maxLength(4)]),
  });
 
  @ViewChild('modal') ShowModal: IonModal;
  @ViewChild('modalites') ShowModal_2: IonModal;
    constructor(private router: Router,
                private reqService: RequestService,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private auth: AuthService,
                private toastCtrl: ToastController) { }
  
    ngOnInit() {
      this.reqService.Infos().subscribe(
        async (data: string) => {
          this.nom = data['name'];
          this.email = data['email'];
          this.vue = 1;
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
          alert.present();
         
        }
      );
    }

    ionViewWillEnter(){
      this.class1 = 'tesx';
      this.contact = localStorage.getItem('info_contact');
    }
  
    form = new FormGroup({
      nom: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      old_password: new FormControl(''),
      password_confirmation: new FormControl(''),
    })
  
  
    deconnexion(){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    }
  
    pwd(){
      if (this.vue == 0) {
        this.vue = 1;
      } else{
        this.vue = 0;
      }
    }
  
    async valider(detail){
      const loading = await this.loadingCtrl.create({message: 'Changement en cours...',  duration: 1000});
      await loading.present();
  
      this.auth.update(detail.value).subscribe(
        async(data: string) => {
          const toast = await this.toastCtrl.create({message: data['message'], duration : 3000 , color: 'dark'});
          toast.present();
      })
    }


cancel() {
  this.ShowModal.dismiss(null, 'cancel');
  this.vu_num = 1;
}
cancel_2() {
  this.ShowModal_2.dismiss(null, 'cancel');
}

annuler() {
  this.vu_num -= 1;
}

add() {
  this.vu_num = 2;
}

otp_fav(){
  this.reqService.otp_favoris(this.indicatif,this.le_numero,'Orange Money').subscribe(
    async (data: string) => {
      if (data['check'] == false) {
        this.vu_num = 3;
        this.token = data['token'];
      }
      this.message = data['message'];
    },
    async () => {
      const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
      alert.present();
     
    }
  );
}


valider_otp(){


  this.reqService.add_favoris(this.le_numero, this.le_otp , this.token).subscribe(
    async (data: string) => {
      this.message_2 = data['message'];
      if (data['state'] == true) {
        this.ShowModal.dismiss(null, 'cancel');
        this.vu_num = 1;
        this.le_numero = this.le_otp = this.token = null;
      }
    },
    async () => {
      const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
      alert.present();
     
    }
  );
}
  
    password(){
      this.ShowModal_2.present();
      this.vu_pwd = 0;
    }
    favoris(){
      this.reqService.Numeros().subscribe(
        async (data: string) => {
          this.numeros = data['numeros'];
          this.le_numero = this.le_otp = this.indicatif = null;
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
          alert.present();
         
        }
      );
      this.ShowModal.present();
      this.vu_num = 1;
    }

    pwd_trans(){
      this.vu_pwd = 2;
      this.form2 = new FormGroup({
        principal: new FormControl(null, [Validators.required]),
        nouveau: new FormControl(null, [Validators.required]),
        confirmation: new FormControl(null, [Validators.required])
      });
    }

    pwd_principal(){
      this.vu_pwd = 1;
      this.form1 = new FormGroup({
        ancien: new FormControl(null, [Validators.required]),
        nouveau: new FormControl(null, [Validators.required]),
        confirmation: new FormControl(null, [Validators.required])
      });
    }

    annuler_2(){
      this.vu_pwd = 0;
    }


    change_pwd(){

      this.reqService.ChangePass(this.form1.value).subscribe(
        async (data: string) => {
          
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
          alert.present();
         
        }
      );

    }

    change_pwd_trans(){
            this.reqService.ChangeTransPass(this.form2.value).subscribe(
        async (data: string) => {
          if (data['state'] == 1) {
            this.ShowModal_2.dismiss(null, 'cancel'); 
          }
          this.message_pt = data['message'];
        },
        async () => {
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
          alert.present();
         
        }
      );
    }
}
