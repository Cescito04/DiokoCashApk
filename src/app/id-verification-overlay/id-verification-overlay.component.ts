import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IdVerificationService } from '../services/id-verification.service';

@Component({
  selector: 'app-id-verification-overlay',
  templateUrl: './id-verification-overlay.component.html',
  styleUrls: ['./id-verification-overlay.component.scss']
})
export class IdVerificationOverlayComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  idCardFile: File | null = null;
  selfieFile: File | null = null;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private idVerificationService: IdVerificationService) {
  }

  onIdCardChange(event: any) {
    this.idCardFile = event.target.files[0];
  }

  onSelfieChange(event: any) {
    this.selfieFile = event.target.files[0];
  }

  submit() {
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
        this.idCardFile = null;
        this.selfieFile = null;
        setTimeout(() => {
          this.closeOverlay();
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

  closeOverlay() {
    this.close.emit();
  }

  onBackdropClick(event: any) {
    if (event.target.classList.contains('overlay-backdrop')) {
      this.closeOverlay();
    }
  }
} 