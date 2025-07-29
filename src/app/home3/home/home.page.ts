import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonModal, NavController, ToastController } from '@ionic/angular';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  service_1 = "USDT";
  service_2 = "WALLET";
  logo_1 = "assets/LOGO/usdt.png";
  logo_2 = "assets/LOGO/wallet.png";
  loader = false;
  achat = 0;
  vente = 0;
  class1;
  numero;
  recu2;
  transId;
  destinataire: number;
  beneficiaire: number;
  test = true;
  form: any;

  form2: any;

  service;
  logo_service;
  om;
  om_bf;
  om_ci;
  om_ml;
  moov_bf;
  moov_ci;
  moov_bj;
  moov_ml;
  mtn_ci;
  mtn_bj;
  fm;
  tm;
  wave;
  wave_ci;
  usdt
  wizall;
  emoney;
  wallet;
  logo_wallet;
  numero_service;
  numero_wallet;

  donnees : any;
  length_d = 7;
  maxlength_d = 10;
  length_b = 7;
  maxlength_b = 10;
  type = 1;
  view;
  adresse = "TJXiUBpSbATMXYJdjcuJjABmGBUDhqRbMN";
  class_content2;
  logo_pays = 'assets/senegal.png';
  nom_pays = "Sénégal";
  code_pays =  'sn';
  @ViewChild('confirmModal') confirmModal: IonModal;
  constructor(private reqService: CryptoService, private route: ActivatedRoute,private navCtrl: NavController,
    private toastCtrl: ToastController) {
      this.form2 = new FormGroup({
        destinataire: new FormControl(this.numero, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.length_d), Validators.maxLength(this.maxlength_d)]),
      });
   }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.class1 = 'test';
    this.loader = true;
    this.reqService.CryptoValue().subscribe(
      async (data: string) => {
          this.achat = data['crypto']['achat'];
          this.vente = data['crypto']['vente'];
          this.loader = false;
      },
      async () => {
        this.loader = false;
      }); 

   }

  async change(){
    this.loader = true;
    const initie = await this.initie();
   }

  initie(){
    this.service_1 == "USDT" ? this.service_1 = "WALLET" : this.service_1 = "USDT";
    this.service_2 == "USDT" ? this.service_2 = "WALLET" : this.service_2 = "USDT";
    this.logo_1 == "assets/LOGO/usdt.png" ? this.logo_1 = "assets/LOGO/wallet.png" : this.logo_1 = "assets/LOGO/usdt.png";
    this.logo_2 == "assets/LOGO/usdt.png" ? this.logo_2 = "assets/LOGO/wallet.png" : this.logo_2 = "assets/LOGO/usdt.png";
    this.type == 1 ? this.type = 2 : this.type = 1;    
    this.loader = false;
   }

   setNumero() {
    this.form2 = new FormGroup({
      destinataire: new FormControl(this.numero, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.length_d), Validators.maxLength(this.maxlength_d)]),
    });
    
   }

   select_pays(nom, logo, code){
    this.nom_pays = nom;
    this.logo_pays = logo;
    this.code_pays = code;
    this.wallet = null;
    this.om = this.wave = this.wizall = this.emoney = this.usdt = this.fm = this.om_bf = this.moov_bf 
    = this.om_ci = this.wave_ci = this.mtn_ci = this.moov_ci = this.mtn_bj = this.moov_bj 
    = this.om_ml = this.moov_ml = this.tm = "opa";
  }





modal(){
  this.confirmModal.present();

}

close_confirm(){
  this.confirmModal.dismiss(null, 'cancel');
}

async copy_usdt(){
  //android
 document.addEventListener('copy', (e: ClipboardEvent) => {
e.clipboardData.setData('text/plain', (this.adresse));
e.preventDefault();
document.removeEventListener('copy', null);
});
document.execCommand('copy');  

//ios
/*         if (navigator["clipboard"]) {
  try {
    await navigator["clipboard"].writeText(this.adresse);
  } catch (err) {}
}   */  
const toast = await this.toastCtrl.create({message: 'Adresse copiée avec succés!', duration: 3000, position: 'bottom', color: 'dark'});
await toast.present();
}

wallets(w,vu){
  this.om = this.wave = this.wizall = this.emoney = this.usdt = this.fm = this.om_bf = this.moov_bf 
  = this.om_ci = this.wave_ci = this.mtn_ci = this.moov_ci = this.mtn_bj = this.moov_bj 
  = this.om_ml = this.moov_ml = this.tm = "opa";
this.view = vu;
  switch (w) {
    case "om":
      this.om = null;
      this.wallet = "Orange Money";
      this.logo_wallet = "OrangeMoney_icon.png"
      break;
    case "wave":
      this.wave = null;
      this.wallet = "Wave";
      this.logo_wallet = "Wave_icon.png"
      break;
    case "fm":
      this.fm = null;
      this.wallet = "Free Money";
      this.logo_wallet = "FreeMony_icon.png"
      break;
    case "wizall":
      this.wizall = null;
      this.wallet = "Wizall Money";
      this.logo_wallet = "Wizall_icon.png"
      break;
    case "emoney":
      this.emoney = null;
      this.wallet = "E-Money";
      this.logo_wallet = "Emoney_icon.png"
      break;
    case "om_bf":
      this.om_bf = null;
      this.wallet = "Orange Money BF";
      this.logo_wallet = "OrangeMoney_icon.png"
      break;
    case "moov_bf":
      this.moov_bf = null;
      this.wallet = "Moov BF";
      this.logo_wallet = "moov.png"
      break;
    case "om_ci":
      this.om_ci = null;
      this.wallet = "Orange Money CI";
      this.logo_wallet = "OrangeMoney_icon.png"
      break;
    case "wave_ci":
      this.wave_ci = null;
      this.wallet = "Wave CI";
      this.logo_wallet = "Wave_icon.png"
      break;
    case "moov_ci":
      this.moov_ci = null;
      this.wallet = "Moov CI";
      this.logo_wallet = "moov.png"
      break;
    case "mtn_ci":
      this.mtn_ci = null;
      this.wallet = "Mtn CI";
      this.logo_wallet = "mtn.png"
      break;
    case "mtn_bj":
      this.mtn_bj = null;
      this.wallet = "Mtn BJ";
      this.logo_wallet = "mtn.png"
      break;
    case "moov_bj":
      this.moov_bj = null;
      this.wallet = "Moov BJ";
      this.logo_wallet = "moov.png"
      break;
    case "om_ml":
      this.om_ml = null;
      this.wallet = "Orange Money ML";
      this.logo_wallet = "OrangeMoney_icon.png"
      break;
    case "moov_ml":
      this.moov_ml = null;
      this.wallet = "Moov ML";
      this.logo_wallet = "moov.png"
      break;
    case "tm":
      this.tm = null;
      this.wallet = "T-Money";
      this.logo_wallet = "t-money.png"
      break;
    default:
      this.usdt = null;
      this.wallet = "USDT";
      this.logo_wallet = "usdt.png"
      break;
  }
 }

 async validerCrypto(){
  this.loader = true;
  let donnees = {
    transId : this.transId,
  }
  this.reqService.CheckTxId(donnees).subscribe(
    async (data: string) => {
      if (data['status'] == 1) {
        this.navCtrl.navigateForward(['/crypto-valider', {data: JSON.stringify(data)}]);   
      } else{
        this.loader = false;
        const toast = await this.toastCtrl.create({message: 'La Transaction ID est incorrecte ou déjà utilisée!', duration: 3000, position: 'bottom', color: 'dark'});
await toast.present();
      }

    },
    async () => {
       this.loader = false;
     this.transId = null;
    }
  ); 

 }

 async validerWallet(){
  let donnees = {
    wallet : this.wallet,
    numero : this.numero
 };
    this.navCtrl.navigateForward(['/wallet', {data: JSON.stringify(donnees)}]);
   }

choix_2(){
  if (this.class_content2 == 'vide') {
    this.class_content2 = ''; 
  } else{
    this.class_content2 = 'vide';
  }
  event.stopPropagation();
  
 }

 out(){
  this.class_content2 = '';
  event.stopPropagation();
  }

}
