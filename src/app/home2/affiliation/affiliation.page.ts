import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController, Gesture, GestureController, IonContent, NavController } from '@ionic/angular';
import { RequestService } from '../../services/request.service';
import { interval } from "rxjs";


@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.page.html',
  styleUrls: ['./affiliation.page.scss'],
})
export class AffiliationPage implements OnInit {

  class1;
  country;
  class_solde = null;
  lien = null;
  solde=0;
  affilie = 0;
  refresher;
  loader = false;
  affilies;
  logo_2;
  class_content1;
  class_content2;
  class_pays_c;
  class_pays_d;
  list_pays_c;
  list_pays;
  hideitem_2 = true;
  service_2;
  color_2;
  beneficiaire;
  montant;
pays = "sn";
pays_c = "sn";

sen_d = [
  {
    "service" : "Orange Money",
    "logo" : "assets/LOGO/OrangeMoney_icon.png",
    "color" : "#FA7C45"
  }, 
  {
    "service" : "Wave",
    "logo" : "assets/LOGO/Wave_icon.png",
    "color" : "#46B1FF"
  },
  {
    "service" : "Free Money",
    "logo" : "assets/LOGO/FreeMony_icon.png",
    "color" : "#DA2528"
  },
  {
    "service" : "E-Money",
    "logo" : "assets/LOGO/Emoney_icon.png",
    "color" : "#996699"
  },
  {
    "service" : "Wizall Money",
    "logo" : "assets/LOGO/Wizall_icon.png",
    "color" : "#2BB7CD"
  }
];

civ_d = [
  {
    "service" : "Orange Money CI",
    "logo" : "assets/LOGO/OrangeMoney_icon.png",
    "color" : "#FA7C45"
  }, 
  {
    "service" : "Wave CI",
    "logo" : "assets/LOGO/Wave_icon.png",
    "color" : "#46B1FF"
  },
  {
    "service" : "Mtn CI",
    "logo" : "assets/LOGO/mtn.png",
    "color" : "#FFCC00"
  },
  {
    "service" : "Moov CI",
    "logo" : "assets/LOGO/moov.png",
    "color" : "#FF6600"
  }
];

bf_d = [
  {
    "service" : "Orange Money BF",
    "logo" : "assets/LOGO/OrangeMoney_icon.png",
    "color" : "#FA7C45"
  }, 
  {
    "service" : "Moov BF",
    "logo" : "assets/LOGO/moov.png",
    "color" : "#FF6600"
  }
];

ml_d = [
  {
    "service" : "Orange Money ML",
    "logo" : "assets/LOGO/OrangeMoney_icon.png",
    "color" : "#FA7C45"
  }, 
  {
    "service" : "Moov ML",
    "logo" : "assets/LOGO/moov.png",
    "color" : "#FF6600"
  }
];

bj_d = [
  {
    "service" : "Moov BJ",
    "logo" : "assets/LOGO/moov.png",
    "color" : "#FF6600"
  },
  {
    "service" : "Mtn BJ",
    "logo" : "assets/LOGO/mtn.png",
    "color" : "#FFCC00"
  }
];

tg_d = [
  {
    "service" : "T-Money",
    "logo" : "assets/LOGO/t-money.png",
    "color" : "#FF6600"
  }
];



  hand =  null;
  private timer;
  @ViewChild(IonModal) ShowModal: IonModal;
  @ViewChild('RetraitModal') RetraitModal: IonModal;
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

          this.pays = localStorage.getItem('country');
          this.pays_c = localStorage.getItem('country');
          switch (localStorage.getItem('country')) {
            case 'sn':
              this.list_pays = this.sen_d;
              this.list_pays_c = this.sen_d;
              break;
            case 'civ':
              this.list_pays = this.civ_d
              this.list_pays_c = this.civ_d;
              break;
            case 'bf':
              this.list_pays = this.bf_d
              this.list_pays_c = this.sen_d;
              this.pays_c = 'sn';
              break;
            case 'ml':
              this.list_pays = this.ml_d
              this.list_pays_c = this.sen_d;
              this.pays_c = 'sn';
              break;
            case 'bj':
              this.list_pays = this.bj_d
              this.list_pays_c = this.bj_d;
              break;
            case 'tg':
              this.list_pays = this.tg_d
              this.list_pays_c = this.tg_d;
              break;
            default:
              this.list_pays = this.sen_d;
              this.list_pays_c = this.sen_d;
              this.pays = "sn";
              this.pays_c = "sn";
              break;
          }
        }
  
        private onMove(detail) {
          const type = detail.type;
          const currentX = detail.currentX;
          const deltaX = detail.deltaX;
          const velocityX = detail.velocityX;
          const vel = detail.deltaY;
          
          
          if (deltaX >= 100 && vel < 50) {
            this.navCtrl.navigateBack(['/crypto-home']);
          }


            //de la gauche vers la droite
        if (deltaX <= -100 && vel < 50) {
          this.navCtrl.navigateForward(['/home']);
        } 
        }
  
    async ionViewWillEnter() {  
      this.class1 = 'tesss';
     }
  
     async ionViewDidEnter(){
      this.reqService.affiliation().subscribe(
        async (data) => {
         this.lien = data['lien'];
         this.solde = data['solde'];
        this.affilie = data['affilie'];
        this.refresher = interval(25000).subscribe(x => {
          this.refresh();
      });

        }
      );
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
  
   async indispo(){
    const toast = await this.toastCtrl.create({message: 'Ce service n\'est pas encore disponible dans votre région!', duration: 3000, color: 'dark'});
     await toast.present();
   }

   set_class_solde(){
    if (this.class_solde == null) {
      this.class_solde = "padding-top: 25px";
    } else {
      this.class_solde = null;
    }
   }
  
   async copy(){
   
//android
/*  document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', ('Merci de télécharger l\'application DIOKO à travers mon lien: https://affiliation.diokogroup.com/affiliate/'+this.lien));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');   */
 
    
     //ios
        if (navigator["clipboard"]) {
        try {
          await navigator["clipboard"].writeText('Merci de télécharger l\'application DIOKO à travers mon lien: https://affiliation.diokogroup.com/affiliate/'+this.lien);
        } catch (err) {}
      }   
      const toast = await this.toastCtrl.create({message: 'Votre lien a été copié avec succés!', duration: 3000, position: 'top', color: 'dark'});
      await toast.present();
   }

   infos(){
    this.ShowModal.present();
   }
   retrait(){
    this.RetraitModal.present();
   }

   list_affilie(){
    this.loader = true;
    this.reqService.list_affilie().subscribe(
      async (data) => {
        this.affilies = data['affilies'];
        this.loader = false;
        this.ListAffilier.present();
      },
      async () => {
        this.loader = false;
      }
    );

   }

   refresh(){
    this.reqService.affiliation().subscribe(
      async (data) => {
       this.solde = data['solde'];
      this.affilie = data['affilie'];     
      }
    );
   }

   ionViewDidLeave(){
    this.refresher.unsubscribe()
   }


   choix_pays(){
    if (this.class_pays_d == 'vide') {
      this.class_pays_d = ''; 
    } else{
      this.class_pays_d = 'vide';
    }
    this.class_pays_c = '';
    this.class_content1 = '';
    this.class_content2 = '';
    event.stopPropagation();
    
   }

   choix_pays_c(){
    if (this.class_pays_c == 'vide') {
      this.class_pays_c = ''; 
    } else{
      this.class_pays_c = 'vide';
    }
    this.class_pays_d = '';
    this.class_content1 = '';
    this.class_content2 = '';
    event.stopPropagation();
    
   }

   choix_2(){
    if (this.class_content2 == 'vide') {
      this.class_content2 = ''; 
    } else{
      this.class_content2 = 'vide';
    }
    this.class_content1 = '';
    this.class_pays_d = '';
    this.class_pays_c = '';
    event.stopPropagation();
    
   }

   selectItem_2(item,logo,color){
    this.service_2 = item;
    this.logo_2 = logo;
    this.color_2 = color;
    this.hideitem_2 = false;
   }


   selectPays_c(item){
    this.hideitem_2 = true;
    this.service_2 = null;
    this.pays_c = item;
    switch (item) {
      case 'sn':
        this.list_pays_c = this.sen_d
        break;
        case 'civ':
          this.list_pays_c = this.civ_d
          break;
        case 'ml':
          this.list_pays_c = this.ml_d
          break;
        case 'bj':
          this.list_pays_c = this.bj_d
          break;
        case 'tg':
          this.list_pays_c = this.tg_d
          break;
      default:
        break;
    }
    this.choix_2();
   }


   retirer(){
 
      this.solde -= this.montant; 

      this.reqService.retraitAffilier(this.service_2, this.beneficiaire, this.montant).subscribe(
        async (data) => {
          data;
        }
      );
      this.service_2 = this.beneficiaire = this.montant = null;
      this.RetraitModal.dismiss();
    
   }


   out(){
    this.class_content1 = '';
    this.class_content2 = '';
    this.class_pays_d = '';
    this.class_pays_c = '';
    event.stopPropagation();
    }

  }
  