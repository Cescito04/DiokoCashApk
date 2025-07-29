import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Form } from "../services/transfert/form.model";
import { Transfert } from "./request.model";
@Injectable({
    providedIn: 'root'
})

export class RequestService{
    apiUrl = 'http://localhost:8000/api';
    version = 1;

    constructor(private http: HttpClient){}

    //debit ==service du compte à debiter
    //provenance == telephone compte a debiter
    //beneficiaire == Telephone compte a crediter
    //service == service compte a crediter

    Transfert(credentials: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('debit', credentials.debit)
                                        .set('beneficiaire', credentials.beneficiaire)
                                        .set('provenance', credentials.provenance)
                                        .set('montant',credentials.initial)
                                        .set('service',credentials.service)
                                        .set('initial', credentials.montant)
                                        .set('step', credentials.step)
                                        .set('trans_id', credentials.trans_id)
                                        .set('otp', credentials.otp)
                                        .set('otp_validation', credentials.validation_otp)
                                        .set('transaction_id', credentials.transaction_id)
                                        .set('version', this.version);
        return this.http.get(`${this.apiUrl}/transferts`,{headers,params: params})
    }

    TransfertMultiple(credentials: Transfert) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
        let params = new HttpParams().set('debit', credentials.debit)
                                      .set('beneficiaire', credentials.beneficiaire)
                                      .set('provenance', credentials.provenance)
                                      .set('montant',credentials.initial)
                                      .set('service',credentials.service)
                                      .set('initial', credentials.montant)
                                      .set('step', credentials.step)
                                      .set('trans_id', credentials.trans_id)
                                      .set('otp', credentials.otp)
                                      .set('beneficiaires', credentials.list_data)
                                      .set('otp_validation', credentials.validation_otp)
                                      .set('version', 2);
      return this.http.get(`${this.apiUrl}/transaction_multiple`,{headers,params: params})
  }

    Find(credentials: Transfert) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
        let params = new HttpParams().set('beneficiaire', credentials.beneficiaire)
                                     
      return this.http.get(`${this.apiUrl}/find_facture`,{headers,params: params})
  }

    Credit(credentials: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('debit', credentials.debit)
                                        .set('beneficiaire', credentials.beneficiaire)
                                        .set('provenance', credentials.provenance)
                                        .set('montant',credentials.montant)
                                        .set('initial', credentials.initial)
                                        .set('nom',credentials.nom)
                                        .set('service',credentials.service)
                                        .set('frais', credentials.frais)
                                        .set('step', credentials.step)
                                        .set('trans_id', credentials.trans_id)
                                        .set('otp', credentials.otp)
                                        .set('otp_validation', credentials.validation_otp)
                                        .set('version', this.version);
        return this.http.get(`${this.apiUrl}/credits`,{headers,params: params})
    }

    Facture(credentials: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('debit', credentials.debit)
                                        .set('beneficiaire', credentials.beneficiaire)
                                        .set('provenance', credentials.provenance)
                                        .set('montant',credentials.initial)
                                        .set('nom',credentials.nom)
                                        .set('service',credentials.service)
                                        .set('initial', credentials.montant)
                                        .set('step', credentials.step)
                                        .set('trans_id', credentials.trans_id)
                                        .set('otp', credentials.otp)
                                        .set('com', credentials.commission)
                                        .set('phone', credentials.phone)
                                        .set('otp_validation', credentials.validation_otp)
                                        .set('version', this.version)
                                        .set('codeParrain', credentials.code_parrain)
                                        .set('nombre', credentials.nombre);
        return this.http.get(`${this.apiUrl}/factures`,{headers,params: params})
    }

    Multiple(credentials: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('beneficiaires', credentials.list_data)
                                      
        return this.http.get(`${this.apiUrl}/multiple`,{headers,params: params})
    }

    Transaction (id){
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
        
        let params = new HttpParams().set('id', id)                        
        return this.http.get(`${this.apiUrl}/details_transaction`,{headers,params: params})
    }

    Trans(periode: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('periode', periode) 
        return this.http.get(`${this.apiUrl}/transactions`,{headers,params: params})
    }

    Infos(){
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
        return this.http.get(`${this.apiUrl}/infos`,{headers}) 
    }

    Reverifier(id: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('id', id)
        return this.http.get(`${this.apiUrl}/reverifier`,{headers, params: params})
    }    

    Com(valeur: string, type: string, serv: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('montant', valeur).set('type', type)
          .set('from', serv.debit).set('to', serv.service)
        return this.http.get(`${this.apiUrl}/commissions`,{headers, params: params})
    }

    ComCredit(valeur: string, serv: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('montant', valeur)
          .set('from', serv.debit).set('to', serv.service)
        return this.http.get(`${this.apiUrl}/commissions_credit`,{headers, params: params})
    }

    Com_fact(valeur: string, type: string, from: string, to: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('montant', valeur).set('type', type).set('from',from).set('to',to)
        return this.http.get(`${this.apiUrl}/commissions_factures`,{headers, params: params})
    }

    Com_woyof(valeur: string, type: string, serv: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('montant', valeur).set('type', type).set('to', serv)
        return this.http.get(`${this.apiUrl}/commissions_woyofal`,{headers, params: params})
    }



    OrangeMoney(): Observable<Form[]> {
        const token = localStorage.getItem('token');
        // const token = "2|3QqCn34ISR7qNQYDrYWcEK22h3bkHLUra56RkOSp";
        const headers = new HttpHeaders({
            
            'Authorization': 'Bearer ' + token
          })
            return this.http.get<Form[]>(`${this.apiUrl}/user` , {headers})
    }

    EMoney(credentials: Transfert) {

        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('debit', credentials.debit).set('beneficiaire', credentials.beneficiaire)
                                        .set('provenance', credentials.provenance).set('montant',credentials.initial)
                                        .set('initial', credentials.montant);
        return this.http.get(`${this.apiUrl}/e_money`,{headers,params: params})
    }

    Woyofal(credentials: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('debit', credentials.debit).set('beneficiaire', credentials.beneficiaire)
                                        .set('provenance', credentials.provenance).set('montant',credentials.initial)
                                        .set('initial', credentials.montant);
        return this.http.get(`${this.apiUrl}/woyofal`,{headers,params: params})
    }


    Confiance(credentials: Transfert) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
        let params = new HttpParams().set('debit', credentials.debit)
                                      .set('beneficiaire', credentials.beneficiaire)
                                      .set('provenance', credentials.provenance)
                                      .set('montant',credentials.initial)
                                      .set('service',credentials.service)
                                      .set('initial', credentials.montant)
                                      .set('step', credentials.step)
                                      .set('trans_id', credentials.trans_id)
                                      .set('otp', credentials.otp);
      return this.http.get(`${this.apiUrl}/check_confiance`,{headers,params: params})
  }

  Numeros() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    return this.http.get(`${this.apiUrl}/mes_numeros`,{headers})
}

otp_favoris(indicatif,numero,service) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    let params = new HttpParams().set('numero', numero)
                                 .set('indicatif', indicatif)
                                 .set('service', service);
  return this.http.get(`${this.apiUrl}/otp_favoris`,{headers,params: params})
}

add_favoris(numero, otp, tokeniser) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    let params = new HttpParams().set('otp', otp)
                                  .set('token', tokeniser)
                                  .set('numero', numero)
  return this.http.get(`${this.apiUrl}/add_favoris`,{headers,params: params})
}

ChangeTransPass(credentials: Transfert) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    let params = new HttpParams().set('principal', credentials.principal)
                                  .set('nouveau', credentials.nouveau)
                                  .set('confirmation', credentials.confirmation)
  return this.http.get(`${this.apiUrl}/change_trans_pass`,{headers,params: params})
}

ChangePass(credentials: Transfert) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    let params = new HttpParams().set('ancien', credentials.ancien)
                                  .set('nouveau', credentials.nouveau)
                                  .set('confirmation', credentials.confirmation)
  return this.http.get(`${this.apiUrl}/change_pass`,{headers,params: params})
}

confirm_trans_pass(password, numero) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    let params = new HttpParams().set('password', password)
                                .set('numero', numero)
  return this.http.get(`${this.apiUrl}/confirm_trans_pass`,{headers,params: params})
}


    test(){

         let params = new HttpParams().set('id', 'seydi484');
            return this.http.get(`${this.apiUrl}/test`, {params: params})
    }

    test1(){

        
           return this.http.get(`${this.apiUrl}/status`, {})
   }

    message(){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
           return this.http.get(`${this.apiUrl}/message_user`, {headers})
   }
    affiliation(){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
           return this.http.get(`${this.apiUrl}/get_affiliation`, {headers})
   }

    list_affilie(){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
           return this.http.get(`${this.apiUrl}/list_affilie`, {headers})
   }

   usdt(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
         return this.http.get(`${this.apiUrl}/usdt`, {headers})
 }

 checkParrain (code){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
  
  let params = new HttpParams().set('code', code)                        
  return this.http.get(`${this.apiUrl}/check_parrain`,{headers,params: params})
}

retraitAffilier(service, beneficiaire, montant) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    let params = new HttpParams().set('beneficiaire', beneficiaire)
                                  .set('montant',montant)
                                  .set('service',service)
  return this.http.get(`${this.apiUrl}/retraitAffilier`,{headers,params: params})
}


}