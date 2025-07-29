import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Crypto } from "./crypto.model";
import { Transfert } from "./request.model";
@Injectable({
    providedIn: 'root'
})

export class CryptoService{
    apiUrl = 'https://diokend.diokocash.com/api';
    version = 1;

    constructor(private http: HttpClient){}


    CryptoValue() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('crypto', 'USDT')
                                        .set('version', this.version);
        return this.http.get(`${this.apiUrl}/cryptoValue`,{headers,params: params})
    }

    CheckTxId(credentials: Crypto) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('transaction_id', credentials.transId)
                                        .set('version', this.version);
        return this.http.get(`${this.apiUrl}/crypto/checkdeposit`,{headers,params: params})
    }

    CryptoBalance() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('crypto', 'USDT')
                                        .set('version', this.version);
        return this.http.get(`${this.apiUrl}/crypto/balance`,{headers,params: params})
    }


    Transfert(credentials: Transfert) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('debit', credentials.debit)
                                        .set('beneficiaire', credentials.beneficiaire)
                                        .set('provenance', credentials.provenance)
                                        .set('crypto',credentials.crypto)
                                        .set('service',credentials.service)
                                        .set('cfa', credentials.cfa)
                                        .set('step', credentials.step)
                                        .set('trans_id', credentials.trans_id)
                                        .set('otp', credentials.otp)
                                        .set('otp_validation', credentials.validation_otp)
                                        .set('transaction_id', credentials.transaction_id)
                                        .set('version', this.version);
        return this.http.get(`${this.apiUrl}/crypto/valider`,{headers,params: params})
    }

    Trans(periode: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('periode', periode) 
        return this.http.get(`${this.apiUrl}/crypto/transactions`,{headers,params: params})
    }

    Transaction (id){
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
        
        let params = new HttpParams().set('id', id)                        
        return this.http.get(`${this.apiUrl}/crypto/details_transaction`,{headers,params: params})
    }

}