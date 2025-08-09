import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController, Gesture, GestureController, IonContent, NavController } from '@ionic/angular';
import { RequestService } from '../services/request.service';
import { interval } from "rxjs";
import { IdVerificationOverlayComponent } from '../id-verification-overlay/id-verification-overlay.component';

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
showIdVerification = false;
showIdReminderBanner = false;
idVerificationStatus = 'none'; // 'none', 'closed_without_submit', 'submitted', 'verified', 'approved', 'rejected'
rejectionReason = ''; // Raison du rejet pour affichage

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

    async ionViewWillEnter() {
      this.class1 = 'tesss';
    }

    async ionViewDidEnter(){
      // Gestion de la vérification d'identité
      this.checkIdVerificationStatus();

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

   closeIdVerification(reason: string) {
     this.showIdVerification = false;
     
     if (reason === 'closed') {
       // Utilisateur a fermé sans soumettre - marquer pour afficher le rappel
       this.idVerificationStatus = 'closed_without_submit';
       this.showIdReminderBanner = true;
       localStorage.setItem('id_verification_status', 'closed_without_submit');
     } else if (reason === 'submitted') {
       // Documents soumis - afficher message de confirmation
       this.idVerificationStatus = 'submitted';
       this.showIdReminderBanner = false;
       localStorage.setItem('id_verification_status', 'submitted');
     }
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
  
  // Nouvelle méthode pour vérifier le statut de vérification d'identité
  checkIdVerificationStatus() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const savedStatus = localStorage.getItem('id_verification_status');
    
    if (!user) return;
    
    // Vérifier le statut de la vérification d'identité via l'API
    this.reqService.checkIdVerificationStatus().subscribe(
      (response) => {
        if (response && response.status) {
          this.handleIdVerificationResponse(response);
        } else {
          // Si aucune info côté serveur, forcer la vérif côté client
          this.showIdVerification = true;
          this.showIdReminderBanner = false;
          this.idVerificationStatus = 'none';
        }
      },
      (error) => {
        console.log('Erreur lors de la vérification du statut:', error);
        this.handleLocalStatus(user, savedStatus);
      }
    );
  }
  
  private handleIdVerificationResponse(response: any) {
    this.showIdVerification = false;
    this.showIdReminderBanner = false;
    
    switch (response.status) {
      case 'approved':
      case 'id_verified':
        this.idVerificationStatus = 'approved';
        localStorage.setItem('id_verification_status', 'approved');
        break;
        
      case 'rejected':
        this.idVerificationStatus = 'rejected';
        this.rejectionReason = response.rejection_reason || 'Documents non conformes aux exigences';
        localStorage.setItem('id_verification_status', 'rejected');
        localStorage.setItem('rejection_reason', this.rejectionReason);
        break;
        
      case 'pending':
      case 'pending_id_review':
        this.idVerificationStatus = 'submitted';
        localStorage.setItem('id_verification_status', 'submitted');
        break;
        
      default:
        this.handleLocalStatus(response, localStorage.getItem('id_verification_status'));
        break;
    }
  }
  
  private handleLocalStatus(user: any, savedStatus: string) {
    // Si l'utilisateur est déjà vérifié ou en cours de review
    if (user.status === 'id_verified' || user.status === 'pending_id_review') {
      this.showIdVerification = false;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = user.status === 'id_verified' ? 'approved' : 'submitted';
      return;
    }
    
    // Si l'utilisateur a un statut qui nécessite une vérification d'identité (nouveau compte, réinitialisé, etc.)
    if (user.status === 'verify' || user.status === 'pending_otp_verification' || user.status === 'created') {
      // Reset du localStorage pour les comptes réinitialisés ou nouveaux
      if (savedStatus === 'submitted' || savedStatus === 'closed_without_submit') {
        localStorage.removeItem('id_verification_status');
        localStorage.removeItem('rejection_reason');
        console.log('localStorage reset: compte réinitialisé ou nouveau');
      }
      // Afficher le popup de vérification
      this.showIdVerification = true;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = 'none';
      return;
    }
    
    // Gérer les statuts locaux sauvegardés
    if (savedStatus === 'closed_without_submit') {
      this.showIdVerification = false;
      this.showIdReminderBanner = true;
      this.idVerificationStatus = 'closed_without_submit';
    } else if (savedStatus === 'submitted') {
      this.showIdVerification = false;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = 'submitted';
    } else if (savedStatus === 'rejected') {
      this.showIdVerification = false;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = 'rejected';
      this.rejectionReason = localStorage.getItem('rejection_reason') || 'Documents non conformes';
    } else if (savedStatus === 'approved') {
      this.showIdVerification = false;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = 'approved';
    } else if (savedStatus === 'dismissed') {
      // L'utilisateur a fermé le banner de succès - ne rien afficher
      this.showIdVerification = false;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = 'none';
    } else {
      // Première fois - afficher le popup
      this.showIdVerification = true;
      this.showIdReminderBanner = false;
      this.idVerificationStatus = 'none';
    }
  }
  
  // Méthode pour rouvrir le popup de vérification
  reopenIdVerification() {
    this.showIdReminderBanner = false;
    this.showIdVerification = true;
  }
  
  // Méthode pour fermer définitivement le banner (plus tard)
  dismissReminderBanner() {
    this.showIdReminderBanner = false;
    // Optionnel : marquer comme "remind_later" dans localStorage
  }
  
  // Méthode pour relancer la vérification après un rejet
  restartVerification() {
    // Nettoyer les statuts précédents
    localStorage.removeItem('id_verification_status');
    localStorage.removeItem('rejection_reason');
    
    // Réinitialiser les propriétés
    this.idVerificationStatus = 'none';
    this.rejectionReason = '';
    this.showIdVerification = true;
    this.showIdReminderBanner = false;
  }
  
  // Méthode pour fermer le banner de succès
  dismissSuccessBanner(event?: Event) {
    // Empêcher la propagation de l'événement pour éviter les conflits
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    this.idVerificationStatus = 'none';
    localStorage.setItem('id_verification_status', 'dismissed');
    console.log('Banner de succès fermé par l\'utilisateur');
  }

}
