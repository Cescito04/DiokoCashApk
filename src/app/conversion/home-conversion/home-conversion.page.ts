import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-conversion',
  templateUrl: './home-conversion.page.html',
  styleUrls: ['./home-conversion.page.scss'],
})
export class HomeConversionPage implements OnInit {

  class1;
  hideitem_1 = true;
  logo_1;
  service_1;
  color_1;

  hideitem_2 = true;
  logo_2;
  service_2;
  color_2;

  hide_valider = true;

  class_content1;
  class_content2;
  class_pays_d;
  class_pays_c;

  pays = "sn";
  list_pays;
  pays_c = "sn";
  list_pays_c;
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
    },
    {
      "service" : "Kpay",
      "logo" : "assets/LOGO/kpay.png",
      "color" : "#067bbf"
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
  bf_c = [
    {
      "service" : "Orange Money BF",
      "logo" : "assets/LOGO/OrangeMoney_icon.png",
      "color" : "#FA7C45"
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
  ml_c = [
    {
      "service" : "Orange Money ML",
      "logo" : "assets/LOGO/OrangeMoney_icon.png",
      "color" : "#FA7C45"
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
    },
    {
      "service" : "Moov TG",
      "logo" : "assets/LOGO/moov.png",
      "color" : "#FF6600"
    }
  ];
  

  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
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

  ionViewWillEnter() {
    this.class1 = 'test';
   }

   choix_1(){
    if (this.class_content1 == 'vide') {
      this.class_content1 = ''; 
    } else{
      this.class_content1 = 'vide';
    }
    this.class_content2 = '';
    this.class_pays_d = '';
    this.class_pays_c = '';
    event.stopPropagation();
    
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


   selectItem_1(item,logo,color){
    this.service_1 = item;
    this.logo_1 = logo;
    this.color_1 = color;
/*     if (item === 'Orange Money') {
      this.logo_1 = "assets/LOGO/OrangeMoney_icon.png"; 
      this.color_1 = "#FA7C45";  
    } else if(item === 'Wave') {
      this.logo_1 = "assets/LOGO/Wave_icon.png";
      this.color_1 = "#46B1FF";
    } else if (item === 'Free Money') {
      this.logo_1 = "assets/LOGO/FreeMony_icon.png";
      this.color_1 = "#DA2528";
    } else if (item === 'Wizall Money') {
      this.logo_1 = "assets/LOGO/Wizall_icon.png";
      this.color_1 = "#2BB7CD";
    } else if (item === 'E-Money') {
      this.logo_1 = "assets/LOGO/Emoney_icon.png";
      this.color_1 = "#996699";
    } */
    this.hideitem_1 = false;
   }

   selectItem_2(item,logo,color){
    this.service_2 = item;
    this.logo_2 = logo;
    this.color_2 = color;
    this.hideitem_2 = false;
   }

   selectPays(item){
    this.hideitem_1 = true;
    this.service_1 = null;
    this.pays = item;
    switch (item) {
      case 'sn':
        this.list_pays = this.sen_d
        this.selectPays_c(item);
        break;
        case 'civ':
          this.list_pays = this.civ_d
          this.selectPays_c(item);
          break;
        case 'ml':
          this.list_pays = this.ml_d;
          this.selectPays_c(item);
          break;
        case 'bf':
          this.list_pays = this.bf_d;
          this.selectPays_c(item);
          break;
        case 'bj':
          this.list_pays = this.bj_d
          this.selectPays_c(item);
          break;
        case 'tg':
          this.list_pays = this.tg_d
          this.selectPays_c(item);
          break
      default:
        break;
    }
    this.choix_1();
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
          this.list_pays_c = this.ml_c
          break;
        case 'bj':
          this.list_pays_c = this.bj_d
          break;
        case 'bf':
          this.list_pays_c = this.bf_c
          break;
        case 'tg':
          this.list_pays_c = this.tg_d
          break;
      default:
        break;
    }
    this.choix_2();
   }


   out(){
   this.class_content1 = '';
   this.class_content2 = '';
   this.class_pays_d = '';
   this.class_pays_c = '';
   event.stopPropagation();
   }

   valider(){

    let donnees = {
      service_1 : this.service_1,
      service_2 : this.service_2,
      logo_1 : this.logo_1,
      logo_2 : this.logo_2,
      color_1 : this.color_1,
      color_2 : this.color_2,
    }

    this.navCtrl.navigateForward(['/transaction', {data: JSON.stringify(donnees)}]);
   }
}
