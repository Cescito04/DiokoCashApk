import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IdVerificationService } from '../services/id-verification.service';

@Component({
  selector: 'app-id-verification-modal',
  templateUrl: './id-verification-modal.component.html',
  styleUrls: ['./id-verification-modal.component.scss']
})
export class IdVerificationModalComponent {
  idCardFile: File | null = null;
  selfieFile: File | null = null;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private modalCtrl: ModalController,
    private idVerificationService: IdVerificationService
  ) {
    console.log('MODALE CHARGÉE');
  }

  onIdCardChange(event: any) {
    this.idCardFile = event.target.files[0];
  }

  onSelfieChange(event: any) {
    this.selfieFile = event.target.files[0];
  }

  submit() {
    console.log('SUBMIT CLICKED', this.idCardFile, this.selfieFile);
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.idCardFile || !this.selfieFile) {
      this.errorMsg = 'Veuillez sélectionner la CNI et le selfie.';
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('id_card', this.idCardFile);
    formData.append('selfie', this.selfieFile);
    this.idVerificationService.submitIDVerification(formData).subscribe({
      next: (res) => {
        this.successMsg = 'Vérification soumise avec succès !';
        this.loading = false;
        // Reset du formulaire
        this.idCardFile = null;
        this.selfieFile = null;
        // Fermeture automatique après 2s
        setTimeout(() => {
          this.close();
        }, 2000);
      },
      error: (err) => {
        // Gestion détaillée des erreurs de validation
        if (err?.error?.errors) {
          // Compatible ES2015 : concatène tous les messages d'erreur
          this.errorMsg = Object.values(err.error.errors).map(arr => (Array.isArray(arr) ? arr.join(' ') : arr)).join(' ');
        } else if (err?.error?.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Erreur lors de la soumission.';
        }
        this.loading = false;
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
