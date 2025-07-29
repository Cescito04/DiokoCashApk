import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';
import { Contacts } from '@capacitor-community/contacts';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  class1;
  contactCard = false;
  favorisCard = false;
  recu;
  recu2;
  destinataire: string;
  beneficiaire: string;
  test = true;
  form: any;

  form2: any;

  donnees : any;
  length_d = 9;
  maxlength_d = 9;
  length_b = 9;
  maxlength_b = 9;
  contacts : any;
  allContacts : any;
  favori : any;
  @ViewChild('confirmModal') confirmModal: IonModal;
  @ViewChild(IonModal) ContactMdal: IonModal;
  isModalOpen = false;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  constructor(private reqService: RequestService, private route: ActivatedRoute,private navCtrl: NavController) {
    this.donnees = JSON.parse(this.route.snapshot.params['data']);
    if (this.donnees.service_1 == 'Orange Money CI' || this.donnees.service_1 == 'Moov CI') {
      this.length_d = 8;
      this.maxlength_d = 10;
    } else if(this.donnees.service_1 == 'Moov BF' || this.donnees.service_1 == 'Orange Money BF' || this.donnees.service_1 == 'T-Money' || this.donnees.service_1 == 'Orange Money ML' || this.donnees.service_1 == 'Moov ML'){
      this.length_d = 8;
      this.maxlength_d = 8;
    } else if (this.donnees.service_1 == 'Wave CI' || this.donnees.service_1 == 'Mtn CI') {
      this.length_d = 8;
      this.maxlength_d = 10;
    } else if (this.donnees.service_1 == 'Mtn BJ' || this.donnees.service_1 == 'Moov BJ') {
      this.length_d = 8;
      this.maxlength_d = 8;
    }
    
    if (this.donnees.service_2 == 'Orange Money CI' || this.donnees.service_2 == 'Moov CI') {
      this.length_b = 8;
      this.maxlength_b = 10;
    } else if(this.donnees.service_2 == 'Moov BF' || this.donnees.service_2 == 'Orange Money BF' || this.donnees.service_2 == 'T-Money' || this.donnees.service_2 == 'Orange Money ML' || this.donnees.service_2 == 'Moov ML'){
      this.length_b = 8;
      this.maxlength_b = 8;
    } else if (this.donnees.service_2 == 'Wave CI' || this.donnees.service_2 == 'Mtn CI') {
      this.length_b = 8;
      this.maxlength_b = 10;
    } else if (this.donnees.service_2 == 'Mtn BJ' || this.donnees.service_2 == 'Moov BJ') {
      this.length_b = 8;
      this.maxlength_b = 8;
    }


    this.form2 = new FormGroup({
      destinataire: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.length_d), Validators.maxLength(this.maxlength_d)]),
      beneficiaire: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.length_b), Validators.maxLength(this.maxlength_b)]),
      montant: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3)]),
      frais: new FormControl(''),
    });
   }


  ngOnInit() {
    this.reqService.Numeros().subscribe(
      async (data: string) => {
        this.destinataire = data['numeros'][0].numero; 
      }
    );
  }

  ionViewWillEnter() {
    this.class1 = 'test';
   }

  contact(){
    this.ContactMdal.present();
  }

  setOpen() {
    var isOpen = this.contactCard;
    if (isOpen == true) {
      this.contactCard = false;
    }
    else{
      const projection = {
        // Specify which fields should be retrieved.
        name: true,
        phones: true,
        postalAddresses: true,
      };
    
        Contacts.getContacts({
          projection,
        }).then(result => {
        this.contacts = this.allContacts = result.contacts
      });
/*       this.contacts = this.allContacts = [
        {
          id: 1,
          name: {
            display: 'Seydina'
          },
          phones: [
            { number: '774848057' }
          ]
        },
        {
          id: 2,
          name: {
            display: 'Jane Smith'
          },
          phones: [
            { number: '776410063' }
          ]
        },
        {
          id: 3,
          name: {
            display: 'Alice Johnson'
          },
          phones: [
            { number: '775615018' }
          ]
        }
      ]; */
      this.contactCard = true;
    }
    this.favorisCard = false;
  }

  filter(value: string) {
    let contacts: any[];    
    if (!value.trim()) {
    contacts = this.allContacts;
    } else {
      const searchTerm = value.toLowerCase().trim();
    contacts = this.contacts.filter(contact =>
      contact.name?.display.toLowerCase().includes(searchTerm) ||
        contact.phones.some(phone => phone.number.includes(searchTerm))
      );
    }

    this.contacts = contacts;
  }

  setFav() {

    var isOpen = this.favorisCard;
    if (isOpen == true) {
      this.favorisCard = false;
    }
    else{
      this.reqService.Numeros().subscribe(
        async (data: string) => {
          this.favori = data['numeros']; 
        }
      );
      this.favorisCard = true
    }
    this.contactCard = false;
  }

  cancel() {
    this.ContactMdal.dismiss(null, 'cancel');
  }

  confirm() {
    this.ContactMdal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

   valider(val){      
    let donnees = {
      service_1 : this.donnees.service_1,
      service_2 : this.donnees.service_2,
      logo_1 : this.donnees.logo_1,
      logo_2 : this.donnees.logo_2,
      color_1 : this.donnees.color_1,
      color_2 : this.donnees.color_2,
      montant : this.recu,
      frais : val,
      destinataire: this.destinataire,
      beneficiaire: this.beneficiaire
    }

    this.navCtrl.navigateForward(['/confirmation', {data: JSON.stringify(donnees)}]);

   }

   async setRecu(){
    this.confirmModal.dismiss(null, 'cancel');
    this.test = false;
    this.form = {
      debit: this.donnees.service_1,
      service: this.donnees.service_2,
    }
    if (this.recu == null) {
        this. recu2 = null ;
    } else if(this.recu == 0){
      this.recu2 = 0;
    } else {
    this.reqService.Com(this.recu, "recu", this.form).subscribe(
    async (data: string) => {
      this.recu2 = data+-this.recu; 
      this.test = true;
      this.valider(this.recu2);
    });  
    }
    this.test = true;
  //this.recu2 = parseFloat(valu) + 500;
}

modal(){
  this.confirmModal.present();

}

favoris(numero){
  this.destinataire = numero;
  this.favorisCard = false;
}
contactss(numero){
  this.beneficiaire = numero;
  this.contactCard = false;
}

close_confirm(){
  this.confirmModal.dismiss(null, 'cancel');
}

}
