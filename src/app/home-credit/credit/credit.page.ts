import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {


  class1;
  vu=1;
  orange;
  free;
  expresso;
  service;
  logo_service;
  om;
  fm;
  wave;
  wizall;
  wallet;
  logo_wallet;
  numero_service;
  numero_wallet;
  form;
  montant;
  url;
  nom_service;
  button;
  click_url;
  mess;
  constructor(
    private reqService: RequestService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

    myform = new FormGroup({
      numero_service: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
      montant: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3)]),
    });
    myform2 = new FormGroup({
      numero_wallet: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
    });
  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.class1 = 'test';
    this.vu = 1;  
    this.orange= null;
    this.free=null;
    this.expresso=null;
    this.service=null;
    this.logo_service=null;
    this.om=null;
    this.fm=null;
    this.wave=null;
    this.wizall=null;
    this.wallet=null;
    this.logo_wallet=null;
    this.numero_service=null;
    this.numero_wallet=null;
    this.form=null;
    this.montant=null;
    this.url;
    this.click_url = null;
    this.nom_service=null;
    this.button = null;
   }

   operateur(op){
    if (op == "orange") {
      this.orange = null;
      this.free = this.expresso = "opa";
      this.service = "Orange";
      this.logo_service = "orange.png";
      this.nom_service = "airtime_orange";
    } else if (op == "free") {
      this.free = null;
      this.orange = this.expresso = "opa";
      this.service = "Free";
      this.logo_service = "free.png";
      this.nom_service = "airtime_free";
    } else if (op == "expresso") {
      this.expresso = null;
      this.orange = this.free = "opa";
      this.service = "Expresso";
      this.logo_service = "expresso.png";
      this.nom_service = "airtime_expresso";
    }
   }

   wallets(w){
    if (w == "om") {
      this.om = null;
      this.fm = this.wizall = this.wave = "opa";
      this.wallet = "Orange Money";
      this.logo_wallet = "OrangeMoney_icon.png"
    } else if (w == "fm") {
      this.fm = null;
      this.om = this.wave = this.wizall = "opa";
      this.wallet = "Free Money";
      this.logo_wallet = "FreeMony_icon.png"
    } else if (w == "wave") {
      this.wave = null;
      this.om = this.fm = this.wizall = "opa";
      this.wallet = "Wave";
      this.logo_wallet = "Wave_icon.png"
    } else if (w == "wizall") {
      this.wizall = null;
      this.om = this.fm = this.wave = "opa";
      this.wallet = "Wizall Money";
      this.logo_wallet = "Wizall_icon.png"
    }
   }

   set_vu(vu){
    this.vu = vu;
    this.button = null;
    this.click_url = null;
    this.url = null;
   }

   confirmer_wave(){
    this.click_url = 0;
    this.reqService.Credit(this.form.value).subscribe(
      async (data: string) => {       
        this.vu = 5;
        if (data['token'] == "Réussi") {
          const toast = await this.toastCtrl.create({message: "Transaction "+data['token'], duration: 3000, color: 'dark'}); 
          await toast.present();
          this.mess = "success";           
        } else{
          const toast = await this.toastCtrl.create({message: data['token'], duration: 3000, color: 'dark'});
          await toast.present();
          this.mess = "fail";
        }
      },
      async () => {
        const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
        alert.present();
      }
    );
   }


   async valider(){
    this.button = 0;
    this.form = new FormGroup({
      debit: new FormControl(this.wallet),
      provenance: new FormControl(this.numero_wallet),
      beneficiaire: new FormControl(this.numero_service),
      initial: new FormControl(this.montant),
      montant: new FormControl(this.montant),
      frais: new FormControl(0),
      nom: new FormControl(''),
      service: new FormControl(this.nom_service),
      step: new FormControl(0),
      trans_id: new FormControl(''),
      otp: new FormControl(''),
    });

    const loading = await this.loadingCtrl.create({message: 'En cours...',  duration: 3000});
    await loading.present();

    this.reqService.Credit(this.form.value).subscribe(
      async (data: string) => {
        this.form.value.step = data['step'];
        if (this.form.value.step == 1) {
          this.url = data['url'];
          this.vu = 4;
          this.form.value.trans_id = data['trans_id'];
          const toast = await this.toastCtrl.create({message: 'Veuillez valider', duration: 3000, color: 'dark'});
          await toast.present();
          loading.dismiss()
        } else{
          this.vu = 5;
          if (data['state'] == "Réussi") {
            const toast = await this.toastCtrl.create({message: "Transaction "+data['message'], duration: 5000, color: 'dark'}); 
            await toast.present();
            this.mess = "success";           
          } else{
            const toast = await this.toastCtrl.create({message: data['message'], duration: 5000, color: 'dark'});
            await toast.present();
            this.mess = "fail";
          }

        }
      },
      async () => {
        const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
        alert.present();
      }
    );
   }


}
