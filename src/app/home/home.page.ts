import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController, Gesture, GestureController, IonContent, NavController } from '@ionic/angular';
import { RequestService } from '../services/request.service';
import { interval } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

class1;
country;

hand =  null;
private timer;
@ViewChild(IonModal) ShowModal: IonModal;
@ViewChild('UpdateModal') UpdateModal: IonModal;
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
        
        //de la gauche vers la droite
        if (deltaX <= -100 && vel < 50) {
          this.navCtrl.navigateForward(['/crypto-home']);
        } 

                //de la droite vers la gauche
        if (deltaX >= 100 && vel < 50) {
          this.navCtrl.navigateBack(['/affiliation']);
        }
      }

  async ionViewWillEnter() {
    this.class1 = 'tesss';
   }

   async ionViewDidEnter(){

    this.reqService.message().subscribe(
      async (data) => {
        localStorage.removeItem('info_contact');
        localStorage.setItem('info_contact',data['contact']);
        localStorage.removeItem('country');
        localStorage.setItem('country',data['country']);
        this.country = localStorage.getItem('country');
        if (data['statut'] == 0) {
/*         if (data['country'] != 'sn' && data['statut'] == 0) { */
            this.ShowModal.present();
        } else {
          if (data['version_i'] > 13) {  
            this.UpdateModal.present();   
          }
        }
      }
    );

    this.timer = interval(2500).subscribe(x => {
      this.handswipe();
  });
   }

   annuler(){
    this.ShowModal.dismiss();
   }

 set() {
  this.class1 = 'test';
 }

 async indispo(){
  const toast = await this.toastCtrl.create({message: 'Ce service n\'est pas encore disponible dans votre région!', duration: 3000, color: 'dark'});
   await toast.present();
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

 ionViewDidLeave(){
  this.timer.unsubscribe()
 }

}
