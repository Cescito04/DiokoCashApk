import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";


@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private url ="http://localhost:8000/api"
    constructor(private http: HttpClient){}

    check_user(user: User){
        return this.http.post(`${this.url}/check_user`, user)
    }

    check_user_reset(user: User){
        return this.http.post(`${this.url}/check_user_reset`, user)
    }

    verif_otp(user: User){
        return this.http.post(`${this.url}/verif_otp`, user)
    }

    register(user: User){
        return this.http.post(`${this.url}/register`, user)
    }

    reset_password(user: User){
        return this.http.post(`${this.url}/reset_password`, user)
    }

    login(credentials: User){
    
            return this.http.post(`${this.url}/connexion` , credentials)
    }

    check_auth(){
        const token = localStorage.getItem('token');
        // const token = "2|3QqCn34ISR7qNQYDrYWcEK22h3bkHLUra56RkOSp";
        const headers = new HttpHeaders({
            
            'Authorization': 'Bearer ' + token
          })
        return this.http.get(`${this.url}/check` , {headers})
    }

    update(data: User){
        const token = localStorage.getItem('token');
        // const token = "2|3QqCn34ISR7qNQYDrYWcEK22h3bkHLUra56RkOSp";
        const headers = new HttpHeaders({
            
            'Authorization': 'Bearer ' + token
          })
          let params = new HttpParams().set('nom', data.nom)
          .set('phone', data.phone)
          .set('old_password', data.old_password)
          .set('password',data.password)
          .set('password_confirmation', data.password_confirmation);
            return this.http.get(`${this.url}/update_infos` , {headers, params: params})
    }

}

