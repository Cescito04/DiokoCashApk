import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController, ToastController } from '@ionic/angular';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.page.html',
  styleUrls: ['./factures.page.scss'],
})
export class FacturesPage implements OnInit {

  class1;
  parrain;
  codeParrain;
  vu=1;
  orange;
  free;
  expresso;
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
  wallet;
  logo_wallet;
  numero_service;
  numero_wallet;
  form;
  montant;
  le_prix;
  url;
  nom_service;
  button;
  click_url;
  mess;
  nom;
  emoney;
  code_vali;
  add_num=0;
  message;
  trans_pass;
  message_tp;
  notif;
  type;
  code_otp;
  token;
  class_content2;
  view;
  logo_pays = 'assets/senegal.png';
  nom_pays = "Sénégal";
  code_pays =  'sn';
  adresse;
  prix;
  id_trans;
  nombre = 1;
  @ViewChild(IonModal) ShowModal: IonModal;
  @ViewChild('ConfirmModal') ConfirmModal: IonModal;
  @ViewChild('ParrainModal') ParrainModal: IonModal;
  constructor(
    private reqService: RequestService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

    myform = new FormGroup({
      numero_service: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)]),
      nom: new FormControl('', [Validators.required]),
      parrain: new FormControl('',[])
    });
    
    myform2 = new FormGroup({
      numero_wallet: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)]),
    });

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.class1 = 'test';
    this.vu = 1 ;  
    this.orange= "opa";
    this.free="opa";
    this.expresso=null;
    this.service="Tawfeex";
    this.logo_service="Lsi_.png";
    this.om=null;
    this.fm= this.parrain =null;
    this.wave=null;
    this.wizall=null; 
    this.wallet=null;
    this.logo_wallet=null;
    this.numero_service=null;
    this.numero_wallet=null;
    this.form=null;
    this.montant = this.le_prix = 35000;
    this.nom=null;
    this.url;
    this.click_url = null;
    this.nom_service="Woyofal";
    this.button = null;
    if (this.service == 'Tawfeex') {
      this.myform = new FormGroup({
        numero_service: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)]),
        nom: new FormControl('', [Validators.required]),
        montant: new FormControl(this.montant),
        parrain: new FormControl('')
      });
    }
   }

  async operateur(op){
    if (op == "woyofal") {
      const toast = await this.toastCtrl.create({message: "Le paiement Woyofal est momentanément indisponible", duration: 1000, color: 'dark'});
      await toast.present();
/*       this.orange = null;
      this.free = this.expresso = "opa";
      this.service = "Woyofal";
      this.logo_service = "woyofal.png";
      this.nom_service = "Woyofal"; */
    } else if (op == "senelec") {
           const toast = await this.toastCtrl.create({message: "Le paiement Senelec est momentanément indisponible", duration: 1000, color: 'dark'});
           await toast.present();
    } else if (op == "seneau") {
           const toast = await this.toastCtrl.create({message: "Le paiement Sen'eau est momentanément indisponible", duration: 1000, color: 'dark'});
           await toast.present();
    } else if (op == "campusen") {
           const toast = await this.toastCtrl.create({message: "Le paiement Campusen est momentanément indisponible", duration: 1000, color: 'dark'});
           await toast.present();
    }
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

  async set_vu(vu){
    if (vu == 3) {
      const loading = await this.loadingCtrl.create({message: 'En cours...',  duration: 3000});
      await loading.present();
      this.form = new FormGroup({
        debit: new FormControl(this.wallet),
        provenance: new FormControl(this.numero_wallet),
        beneficiaire: new FormControl(this.numero_service),
        initial: new FormControl(this.montant*this.nombre),
        montant: new FormControl(this.montant*this.nombre),
        frais: new FormControl(0),
        nom: new FormControl(this.nom),
        service: new FormControl(this.service),
        step: new FormControl(0),
        trans_id: new FormControl(''),
        otp: new FormControl(''),
        validation_otp: new FormControl(''),
        transaction_id: new FormControl(''),
        code_parrain: new FormControl(this.codeParrain),
        nombre : new FormControl(this.nombre)
      });
 /*      this.reqService.Find(this.form.value).subscribe(
        async (data: string) => {                           
          if (data['token'] != "echec") {
            loading.dismiss()
            this.vu = vu; 
            this.nom = data['token'];       
          } else{
            loading.dismiss()
           this.vu = 1;
           const toast = await this.toastCtrl.create({message: "Veuillez reverifier le numéro de compteur", duration: 3000, color: 'dark'});
           await toast.present();
          }
        },
        async () => {
          loading.dismiss()
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
          alert.present();
        }
      ); */
      this.vu = vu; 
      loading.dismiss();
    } else{
      if (vu == 2 && this.myform.value.parrain != '') {
        this.codeParrain = this.myform.value.parrain;
        this.reqService.checkParrain(this.myform.value.parrain).subscribe(
          async (data: string) => {
            this.parrain = data['titulaire'];
            this.ParrainModal.present();
            if (data['titulaire'] != null) {
              this.codeParrain = this.codeParrain;
            } else {
              this.codeParrain = null;
            }
          },
          async () => {
            const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
            alert.present();
          }
        );
        this.myform.value.parrain = '';
      } else{
        this.ParrainModal.dismiss(null, 'cancel');
        this.vu = vu;
        this.button = null;
        this.click_url = null;
        this.url = null;
        if (vu == 2) {
          this.reqService.usdt().subscribe(
            async (data: string) => {       
              this.adresse = data['adresse'];
              this.prix = data['prix'];
            });
            
        }
      }
    }
   }

   confirmer_wave(){
    this.click_url = 0;
    this.reqService.Facture(this.form.value).subscribe(
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


   async before_validation (){

    this.reqService.Confiance(this.form.value).subscribe(
      async (data: string) => {
        if (data['check'] == true && data['password_requirement'] == false) {
          this.notif = 'Ce numéro est authentifié';
          this.valider();
        } else if (data['check'] == true && data['password_requirement'] == true) { 
          this.notif = 'Mot de passe de transaction requis pour le numéro '+ this.form.value.provenance;
          this.type = 1;
          this.ShowModal.present();
          this.trans_pass = null;
          this.message_tp = null;
        } else {
          this.notif = 'Le numéro '+ this.form.value.provenance +' n\'est associé à aucun compte Dioko.';
          this.type = 2;
          this.ShowModal.present();
          this.code_otp = null;
        }
      },
      async () => {
        const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
        alert.present();
      }
    );


   }


   async valider(){


    if((this.form.value.debit == "Orange Money" || this.form.value.debit == "Orange Money BF" || this.form.value.debit == "Orange Money ML" || this.form.value.debit == "Orange Money CI") && this.code_vali == null){
      this.code_vali = null;
      this.ConfirmModal.present();
    } else { 

    this.button = 0;

    this.ConfirmModal.dismiss(null, 'cancel');
    this.form.value.validation_otp = this.code_vali;
    this.code_vali = null;

    const loading = await this.loadingCtrl.create({message: 'En cours...',  duration: 3000});
    await loading.present();

    this.reqService.Facture(this.form.value).subscribe(
      async (data: string) => {

        this.form.value.step = data['step'];
        loading.dismiss()
        if (this.form.value.step == 1) {
            if (this.form.value.debit == "Wizall Money") {
              if (data['token'] == 200) {
                this.code_vali = null;
                this.ConfirmModal.present();
                this.form.value.transaction_id = data['transaction_id']; 
              } else{
                const toast = await this.toastCtrl.create({message: 'Transaction échouée', duration: 5000, color: 'dark'});
                await toast.present();
                this.mess = "fail";
              }
            } else{
              this.url = data['url'];
              this.vu = 4;
              this.form.value.trans_id = data['trans_id'];
              this.click_url = null;
              const toast = await this.toastCtrl.create({message: 'Veuillez valider', duration: 3000, color: 'dark'});
              await toast.present();
            }
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

annuler() {
  this.add_num = 0;
}

cancel() {
  this.ShowModal.dismiss(null, 'cancel');
  this.add_num = 0;
}

close_confirm() {
  this.ConfirmModal.dismiss(null, 'cancel');
  this.code_vali = null;
}
close_parrain() {
  this.ParrainModal.dismiss(null, 'cancel');
}

add() {

  if (this.form.value.debit == 'Orange Money' || this.form.value.debit == 'Free Money' || this.form.value.debit == 'E-Money' || this.form.value.debit == 'Wave' || this.form.value.debit == 'Wizall Money') {
    this.add_num = 1;
    this.reqService.otp_favoris(null,this.form.value.provenance,this.form.value.debit).subscribe(
      async (data: string) => {
        this.token = data['token'];
      },
      async () => {
        const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
        alert.present();
      }
    ); 
  } else {
    this.add_num = 2
  }
}

ajouter() {
  this.reqService.add_favoris(this.form.value.provenance, this.code_otp , this.token).subscribe(
    async (data: string) => {
      this.message = data['message'];
      if (data['state'] == true) {
        this.ShowModal.dismiss(null, 'cancel');
        this.valider(); 
        this.code_otp = this.token = null;
      }
    },
    async () => {
      const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
      alert.present();
     
    }
  );

}

confirm_pass(){
this.reqService.confirm_trans_pass(this.trans_pass, this.form.value.provenance).subscribe(
async (data: string) => {
  this.message_tp = data['message'];
  if (data['state'] == true) {
    this.ShowModal.dismiss(null, 'cancel');
    this.valider(); 
    this.trans_pass = null;
  }
},
async () => {
  const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
  alert.present();
 
}
);

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

  async copy_usdt(){
    //android
document.addEventListener('copy', (e: ClipboardEvent) => {
  e.clipboardData.setData('text/plain', (this.adresse));
  e.preventDefault();
  document.removeEventListener('copy', null);
});
document.execCommand('copy');  


 //ios
/*        if (navigator["clipboard"]) {
    try {
      await navigator["clipboard"].writeText(this.adresse);
    } catch (err) {}
  }   */ 
  const toast = await this.toastCtrl.create({message: 'Adresse copiée avec succés!', duration: 3000, position: 'bottom', color: 'dark'});
  await toast.present();

  this.vu = 3;
  this.form = new FormGroup({
    debit: new FormControl(this.wallet),
    provenance: new FormControl('0000'),
    beneficiaire: new FormControl(this.numero_service),
    initial: new FormControl(this.prix*this.nombre),
    montant: new FormControl(this.prix*this.nombre),
    frais: new FormControl(0),
    nom: new FormControl(this.nom),
    service: new FormControl(this.service),
    step: new FormControl(0),
    trans_id: new FormControl(''),
    otp: new FormControl(''),
    validation_otp: new FormControl(''),
    transaction_id: new FormControl(''),
    code_parrain: new FormControl(this.codeParrain),
    nombre : new FormControl(this.nombre)
  });
  this.reqService.Facture(this.form.value).subscribe(
    async (data: string) => {
      this.id_trans = "Je souhaite acheter une carte Tawfeex. ID Transaction:"+data['id'];
    },
    async () => {
      const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
      alert.present();
    }
  );

  }


  nombres(type){
    if (type == "add") {
      this.nombre ++;
    } else{
      if (this.nombre != 1) {
        this.nombre --;
      } 
    }
    this.le_prix = this.montant*this.nombre
  } 

}
