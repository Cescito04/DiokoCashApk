import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal, LoadingController, ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  donnees : any
  class1;
  form;
  vu=0;
  url;
  click_url;
  mess;
  d_button;
  notif;
  type;
  add_num=0;
  code_otp;
  token;
  message;
  trans_pass;
  message_tp;
  code_vali;
  @ViewChild(IonModal) ShowModal: IonModal;
  @ViewChild('ConfirmModal') ConfirmModal: IonModal;
  constructor(private route: ActivatedRoute,
    private reqService: RequestService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    this.donnees = JSON.parse(this.route.snapshot.params['data']);
   }
  ngOnInit() {
    this.form = new FormGroup({
      debit: new FormControl(this.donnees.service_1),
      provenance: new FormControl(this.donnees.destinataire),
      beneficiaire: new FormControl(this.donnees.beneficiaire),
      initial: new FormControl(this.donnees.montant),
      montant: new FormControl(this.donnees.montant+this.donnees.frais),
      service: new FormControl(this.donnees.service_2),
      step: new FormControl(0),
      trans_id: new FormControl(''),
      otp: new FormControl(''),
      validation_otp: new FormControl(''),
      transaction_id: new FormControl(''),
    })
  }

  ionViewWillEnter() {
    this.class1 = 'tesx';
   }

   confirmer_wave(){
    this.click_url = 0;
    this.reqService.Transfert(this.form.value).subscribe(
      async (data: string) => {
        this.vu = 2;
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
/*     if(this.form.value.debit == "Free Money"){
      const loading = await this.loadingCtrl.create({message: 'Veuillez composer le #150# pour finaliser le retrait Free Money...',  duration: 20000});
      await loading.present();
    } else {
      const loading = await this.loadingCtrl.create({message: 'En cours...',  duration: 10000});
      await loading.present();
    }  */

        if((this.form.value.debit == "Orange Money" || this.form.value.debit == "Orange Money BF" || this.form.value.debit == "Orange Money ML" || this.form.value.debit == "Orange Money CI" || this.form.value.debit == "Kpay") && this.code_vali == null){
          this.code_vali = null;
          this.ConfirmModal.present();
        } else { 
 
          this.d_button = 1;
          this.ConfirmModal.dismiss(null, 'cancel');
          this.form.value.validation_otp = this.code_vali;
          this.code_vali = null;
          
          const loading = await this.loadingCtrl.create({message: 'En cours...'});
          await loading.present();
      
              this.reqService.Transfert(this.form.value).subscribe(
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
                        this.vu = 1;
                        this.form.value.trans_id = data['trans_id'];
                        this.click_url = null;
                        const toast = await this.toastCtrl.create({message: 'Veuillez valider', duration: 3000, color: 'dark'});
                        await toast.present();
                      }
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
                }
              );
        }
  }

  cancel() {
    this.ShowModal.dismiss(null, 'cancel');
    this.add_num = 0;
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

  
}
