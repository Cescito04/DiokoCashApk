import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

  class1;

  transactions;
  transaction;
  periode = "today";
  vue = 0;
  @ViewChild('ShowModal') ShowModal: ElementRef;

  constructor(private reqService: RequestService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.class1 = 'tess';
    this.reqService.Trans(this.periode).subscribe(
      async (data: string) => {
        this.transactions = data;
        this.vue = 1;
      },
      async () => {
        const alert = await this.alertCtrl.create({message: "Il y'a une erreur", buttons: ['OK']});
        alert.present();
      }
    );
   }

   async loadData(id){
    const loading = await this.loadingCtrl.create({message: 'Chargement...'});
    await loading.present();
    this.reqService.Transaction(id).subscribe(
      async (data: string) => {
        this.transaction = data;       
        loading.dismiss();
        this.ShowModal.nativeElement.click();
      },
      async () => {
        const toast = await this.toastCtrl.create({message: 'Erreur, veuillez réessayer', duration: 3000, color: 'dark'});
        await toast.present();
        loading.dismiss();
      }
    );
  }


  async reprendre (id){
    const loading = await this.loadingCtrl.create({message: 'Revérifacation de votre transaction en cours...', duration: 5000});
    await loading.present();
    this.reqService.Reverifier(id).subscribe(
      async (data: string) => {
        const toast = await this.toastCtrl.create({message: 'Reconduction de transfert en cours...',duration: 5000, color:'dark'});
        await toast.present();
      },
      async () => {
        const loading = await this.loadingCtrl.create({message: "Il y'a eu une erreur", duration: 3000});
        await loading.present();
      }
    )
  }


}
