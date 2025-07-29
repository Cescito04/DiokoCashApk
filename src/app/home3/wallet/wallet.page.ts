import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  adresse;
  montant;
  usdt;
  form2: any;
  dispo;
  loader = false;
  donnees : any;
  vente;

  constructor(private navCtrl: NavController,private reqService: CryptoService,private route: ActivatedRoute) { 
    this.form2 = new FormGroup({
      usdt: new FormControl(this.usdt, [Validators.required, Validators.pattern("^[0-9]*$")]),
      adresse: new FormControl(this.adresse, [Validators.required]),
      montant: new FormControl(this.montant, [Validators.required]),
    });

    this.donnees = JSON.parse(this.route.snapshot.params['data']);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loader = true;
    this.reqService.CryptoBalance().subscribe(
      async (data: string) => {
         this.dispo = data;
      },
      async () => {
      });


      this.reqService.CryptoValue().subscribe(
        async (data: string) => {
            this.vente = data['crypto']['vente'];
            this.loader = false;
        },
        async () => {
          this.loader = false;
        }); 

  }

  valider(val){      
    let donnees = {
      service_2 : 'USDT',
      service_1 : 'Wallet',
      logo_2 : 'assets/LOGO/usdt.png',
      logo_1 : 'assets/MENU-CONVERSION/pocket.png',
      color_2 : '#339966',
      color_1 : '#EE7160',
      usdt : this.usdt,
      adresse : this.adresse,
      wallet : this.donnees['wallet'],
      numero : this.donnees['numero']
    }

    this.navCtrl.navigateForward(['/crypto-confirm', {data: JSON.stringify(donnees)}]);

   }

  updatedUsdt(){
    this.montant = this.usdt*this.vente;
    this.form2 = new FormGroup({
      usdt: new FormControl(this.usdt, [Validators.required, Validators.pattern("^[0-9]*$")]),
      adresse: new FormControl(this.adresse, [Validators.required]),
      montant: new FormControl(this.montant, [Validators.required]),
    });
  }

  updatedMontant(){
    this.form2 = new FormGroup({
      usdt: new FormControl(this.usdt, [Validators.required, Validators.pattern("^[0-9]*$")]),
      adresse: new FormControl(this.adresse, [Validators.required]),
      montant: new FormControl(this.montant, [Validators.required]),
    });
  }

}
