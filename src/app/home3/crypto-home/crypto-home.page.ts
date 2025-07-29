import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gesture, GestureController, IonModal, NavController, ToastController } from '@ionic/angular';
import { interval } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-crypto-home',
  templateUrl: './crypto-home.page.html',
  styleUrls: ['./crypto-home.page.scss'],
})
export class CryptoHomePage implements OnInit {
  class1;
  country;
  class_solde = null;
  lien = null;
  solde=0;
  affilie = 0;
  refresher;
  loader = false;
  affilies;
  hand =  null;
private timer;
  @ViewChild(IonModal) ShowModal: IonModal;
  @ViewChild('UpdateModal') UpdateModal: IonModal;
  @ViewChild('ListAffilier') ListAffilier: IonModal;
    constructor(private reqService : RequestService,
                private toastCtrl: ToastController,
                private gestureCtrl: GestureController,
                private navCtrl: NavController,
                private el: ElementRef) { 
                  const gesture: Gesture = this.gestureCtrl.create({
                    el: this.el.nativeElement,
                    threshold: 15,
                    gestureName: 'my-gesture',
                    onMove: ev => this.onMove(ev)
                  }, true);
                }
  
        ngOnInit() {
          const gesture = this.gestureCtrl.create({
            gestureName: 'my-gesture',
            el: this.el.nativeElement,
            onMove: (detail) => { this.onMove(detail); }
          })
        
          gesture.enable();
        }
  
        private onMove(detail) {
          const type = detail.type;
          const currentX = detail.currentX;
          const deltaX = detail.deltaX;
          const velocityX = detail.velocityX;
          const vel = detail.deltaY;
          
          
          if (deltaX >= 100 && vel < 50) {
            this.navCtrl.navigateBack(['/home']);
          }


            //de la gauche vers la droite
        if (deltaX <= -100 && vel < 50) {
          this.navCtrl.navigateForward(['/affiliation']);
        } 
        }
  
    async ionViewWillEnter() {  
      this.class1 = 'tesss';
     }
  
     async ionViewDidEnter(){
      this.timer = interval(2500).subscribe(x => {
        this.handswipe();
    });
     }

     handswipe(){
      switch (this.hand) {
        case null:
          this.hand = 1;
          break;
        case 1:
          this.hand = 2;
          break;
        case 7:
          this.hand = 1;
          break;
      
        default:
          this.hand ++;
          break;
      }
     }

     annuler(){
      this.ShowModal.dismiss();
     }
  
   set() {
    this.class1 = 'test';
   }
  

   set_class_solde(){
    if (this.class_solde == null) {
      this.class_solde = "padding-top: 25px";
    } else {
      this.class_solde = null;
    }
   }
  

   infos(){
    this.ShowModal.present();
   }

}
