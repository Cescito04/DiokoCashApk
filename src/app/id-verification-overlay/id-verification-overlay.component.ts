import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IdVerificationService } from '../services/id-verification.service';

@Component({
  selector: 'app-id-verification-overlay',
  templateUrl: './id-verification-overlay.component.html',
  styleUrls: ['./id-verification-overlay.component.scss']
})
export class IdVerificationOverlayComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<string>(); // Émet 'closed' ou 'submitted'

  idCardFrontFile: File | null = null;
  idCardBackFile: File | null = null;
  selfieFile: File | null = null;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private idVerificationService: IdVerificationService) {
  }

  onIdCardFrontChange(event: any) { this.idCardFrontFile = event.target.files[0]; }
  onIdCardBackChange(event: any) { this.idCardBackFile = event.target.files[0]; }

  onSelfieChange(event: any) {
    this.selfieFile = event.target.files[0];
  }

  submit() {
    this.errorMsg = '';
    this.successMsg = '';
    
    if (!this.idCardFrontFile || !this.idCardBackFile || !this.selfieFile) {
      this.errorMsg = 'Veuillez sélectionner le recto, le verso et le selfie.';
      return;
    }
    
    this.loading = true;
    const formData = new FormData();
    formData.append('id_card_front', this.idCardFrontFile);
    formData.append('id_card_back', this.idCardBackFile);
    formData.append('selfie', this.selfieFile);
    
    this.idVerificationService.submitIDVerification(formData).subscribe({
      next: (res) => {
        this.successMsg = 'Vérification soumise avec succès !';
        this.loading = false;
        this.idCardFrontFile = null;
        this.idCardBackFile = null;
        this.selfieFile = null;
        
        // Mettre à jour le statut utilisateur localement pour éviter que le popup réapparaisse
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (currentUser) {
          currentUser.status = 'pending_id_review';
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
        
        setTimeout(() => {
          this.closeOverlay('submitted');
        }, 2000);
      },
      error: (err) => {
        if (err?.error?.errors) {
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

  closeOverlay(reason: string = 'closed') {
    this.close.emit(reason);
  }

  onBackdropClick(event: any) {
    if (event.target.classList.contains('overlay-backdrop')) {
      this.closeOverlay('closed');
    }
  }
} 