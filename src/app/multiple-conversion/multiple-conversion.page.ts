import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController, NavController, ToastController } from '@ionic/angular';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-multiple-conversion',
  templateUrl: './multiple-conversion.page.html',
  styleUrls: ['./multiple-conversion.page.scss'],
})
export class MultipleConversionPage implements OnInit {
  class1;
  vu=1;
  
  wallet;
  logo_wallet;
  wallet_b;
  logo_wallet_b;
  telephone;
  form;
  montant;
  url;
  nom_service;
  button;
  click_url;
  mess;
  class_content1;
  color_1;
  beneficiaire;
  list_benef = [];
  list;
  montant_global=null;
  telephone_debit=null;
  frais;
  fin=0;

  add_num=0;
  code_otp;
  notif;
  type;
  token;
  message;
  trans_pass;
  message_tp;
  code_vali;
  @ViewChild(IonModal) ShowModal: IonModal;
  @ViewChild('VerifModal') VerifModal: IonModal;
  @ViewChild('ConfirmModal') ConfirmModal: IonModal;
  constructor(private navCtrl: NavController,
    private reqService: RequestService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

    form1 = new FormGroup({
      telephone_debit: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
    });
    form2 = new FormGroup({
      telephone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
    });

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.class1 = 'test';
    this.vu = 1;  
    this.wallet=null;
    this.logo_wallet=null;
    this.wallet_b=null;
    this.logo_wallet_b=null;
    this.form=null;
    this.montant=null;
    this.telephone=null;
    this.url;
    this.click_url = null;
    this.nom_service=null;
    this.button = null;
    this.beneficiaire=null;
    this.list_benef = [];
    this.frais=null;
    this.telephone_debit=null;
    this.fin=0;
   }  

   out(){
    this.class_content1 = '';
    event.stopPropagation();
    }


   choix_1(){
    if (this.class_content1 == 'vide') {
      this.class_content1 = ''; 
    } else {
      this.class_content1 = 'vide';
    }
    event.stopPropagation();
    
   }

   ajout(){
    this.class1 = 'test3';
    this.vu = 6;
   }

   selectItem_1(item){
    this.wallet = item;
    if (item === 'Orange Money') {
      this.logo_wallet = "assets/LOGO/OrangeMoney_icon.png"; 
    } else if(item === 'Wave') {
      this.logo_wallet = "assets/LOGO/Wave_icon.png";
    } else if (item === 'Free Money') {
      this.logo_wallet = "assets/LOGO/FreeMony_icon.png";
    } else if (item === 'Wizall Money') {
      this.logo_wallet = "assets/LOGO/Wizall_icon.png";
    } else if (item === 'E-Money') {
      this.logo_wallet = "assets/LOGO/Emoney_icon.png";
    }
    this.class_content1 = null;
   }



   selectItem_2(item){
    this.wallet_b = item;
    if (item === 'Orange Money') {
      this.logo_wallet_b = "assets/LOGO/OrangeMoney_icon.png";   
    } else if(item === 'Wave') {
      this.logo_wallet_b = "assets/LOGO/Wave_icon.png";
    } else if (item === 'Free Money') {
      this.logo_wallet_b = "assets/LOGO/FreeMony_icon.png";
    } else if (item === 'Wizall Money') {
      this.logo_wallet_b = "assets/LOGO/Wizall_icon.png";
    } else if (item === 'E-Money') {
      this.logo_wallet_b = "assets/LOGO/Emoney_icon.png";
    }
    this.class_content1 = null;
   }


   async wallets(w){
    this.class1 = null;
    this.wallet=null;
    this.logo_wallet=null;
    this.wallet_b=null;
    this.logo_wallet_b=null;
    this.form=null;
    this.montant=null;
    this.telephone=null;
    this.url;
    this.click_url = null;
    this.nom_service=null;
    this.button = null;
    this.beneficiaire=null;
    this.list_benef = [];
    this.frais=null;
    this.telephone_debit=null;
    this.fin=0;
    if (w == "om") {
      this.wallet = "Orange Money";
      this.logo_wallet = "assets/LOGO/OrangeMoney_icon.png"
          this.class1 = 'test2';
    this.vu = 2;
    } else if (w == "fm") {
      this.wallet = "Free Money";
      this.logo_wallet = "assets/LOGO/FreeMony_icon.png"
          this.class1 = 'test2';
    this.vu = 2;
    } else if (w == "wave") {
      this.wallet = "Wave";
      this.logo_wallet = "assets/LOGO/Wave_icon.png"
          this.class1 = 'test2';
    this.vu = 2;
    } else if (w == "wizall") {
      this.wallet = "Wizall Money";
      this.logo_wallet = "assets/LOGO/Wizall_icon.png"
      const toast = await this.toastCtrl.create({message: 'Wizall Money sera bientôt disponible !', duration: 3000, color: 'dark'});
      await toast.present();
    } else if (w == "emoney") {
      this.wallet = "E-Money";
      this.logo_wallet = "assets/LOGO/Emoney_icon.png"
          this.class1 = 'test2';
    this.vu = 2;
    } 

   }

   add_beneficiaire(){
    this.list_benef.push({'telephone':this.telephone , 'montant':this.montant , 'service': this.wallet_b});

    this.montant_global =0;
    this.beneficiaire = 0;

    this.list_benef.forEach(element => {
      this.montant_global += element.montant;
      this.beneficiaire += 1;
    })

    this.list = JSON.stringify(this.list_benef)

    this.form = new FormGroup({
      list_data: new FormControl(this.list),
    });
    
    this.telephone = null;
    this.montant=null;
    this.wallet_b=null;
    this.vu = 2;
   }

   ajouter1(){

    
   }

   set_vu(vu){
    this.vu = vu;
    if (vu == 1) {
      this.class1 = 'test';
    } else if (vu == 2) {
      this.class1 = 'test2';
    } else if (vu == 6) {
      this.class1 = 'test3';
    } else if (vu == 3) {
      this.class1 = 'test4';
    }
    this.button = null;
    this.click_url = null;
    this.url = null;
   }

   async suivant(){
    if (this.beneficiaire <= 1) {
      const toast = await this.toastCtrl.create({message: 'Minimum de deux (2) bénéficiaires requis', duration: 3000, color: 'dark'});
      await toast.present();
    } else {
      const loading = await this.loadingCtrl.create({message: 'En cours...'});
      await loading.present();
    this.reqService.Multiple(this.form.value).subscribe(
      async (data: string) => {
        console.log(data['token']);
        
/*           const toast = await this.toastCtrl.create({message: data['token'], duration: 3000, color: 'dark'});
          await toast.present(); */
          this.frais=data['token']
          this.vu = 3;
          this.class1 = 'test4';
      },
      async () => {
        const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
        alert.present();
      }
    );

    loading.dismiss()
  }

   }

   async before_validation (){

    this.form = new FormGroup({
      list_data: new FormControl(this.list),
      debit: new FormControl(this.wallet),
      provenance: new FormControl(this.telephone_debit),
      beneficiaire: new FormControl(''),
      initial: new FormControl(this.montant_global),
      montant: new FormControl(this.montant_global+this.frais),
      service: new FormControl('multiple'),
      step: new FormControl(0),
      trans_id: new FormControl(''),
      otp: new FormControl(''),
      validation_otp: new FormControl(''),
    });

    this.reqService.Confiance(this.form.value).subscribe(
      async (data: string) => {
        if (data['check'] == true && data['password_requirement'] == false) {
          this.notif = 'Ce numéro est authentifié';
          this.valider();
        } else if (data['check'] == true && data['password_requirement'] == true) { 
          this.notif = 'Mot de passe de transaction requis pour le numéro '+ this.form.value.provenance;
          this.type = 1;
          this.VerifModal.present();
          this.trans_pass = null;
          this.message_tp = null;
        } else {
          this.notif = 'Le numéro '+ this.form.value.provenance +' n\'est associé à aucun compte Dioko.';
          this.type = 2;
          this.VerifModal.present();
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
  
    if(this.form.value.debit == "Orange Money" && this.code_vali == null){
      this.code_vali = null;
      this.ConfirmModal.present();
    } else {

      this.ConfirmModal.dismiss(null, 'cancel');
      this.form.value.validation_otp = this.code_vali;
      this.code_vali = null;

    const loading = await this.loadingCtrl.create({message: 'En cours...'});
    await loading.present();

      this.reqService.TransfertMultiple(this.form.value).subscribe(
        async (data: string) => {
          loading.dismiss()
          this.form.value.step = data['step'];
          if (this.form.value.step == 1) {
            this.url = data['url'];
            this.fin = 1;
            this.form.value.trans_id = data['trans_id'];
            this.click_url = null;
            const toast = await this.toastCtrl.create({message: 'Veuillez valider', duration: 3000, color: 'dark'});
            await toast.present();
          } else{
            if (data['state'] == "Réussi") {
              const toast = await this.toastCtrl.create({message: "Transaction "+data['message'], duration: 5000, color: 'dark'}); 
              await toast.present();  
              this.mess = "success";              
            } else{
              const toast = await this.toastCtrl.create({message: data['message'], duration: 5000, color: 'dark'});
              await toast.present();
              this.mess = "fail";
            }
            this.vu = 2;
          }
        },
        async () => {
          loading.dismiss()
          const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
          alert.present();
        });

      }
}

cancel1() {
  this.ShowModal.dismiss(null, 'cancel');
}



cancel() {
  this.VerifModal.dismiss(null, 'cancel');
  this.add_num = 0;
}
add() {
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
}
annuler() {
  this.add_num = 0;
}

close_confirm() {
  this.ConfirmModal.dismiss(null, 'cancel');
  this.code_vali = null;
}

ajouter() {
      this.reqService.add_favoris(this.form.value.provenance, this.code_otp , this.token).subscribe(
        async (data: string) => {
          this.message = data['message'];
          if (data['state'] == true) {
            this.VerifModal.dismiss(null, 'cancel');
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
        this.VerifModal.dismiss(null, 'cancel');
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




confirmer_wave(){
  this.click_url = 0;
  this.reqService.TransfertMultiple(this.form.value).subscribe(
    async (data: string) => {
      this.fin = 2;
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

}
