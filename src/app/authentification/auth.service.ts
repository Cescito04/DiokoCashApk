import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private url = "http://127.0.0.1:8000/api"
    constructor(private http: HttpClient, private router: Router){}

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
        console.log('=== DEBUG LOGIN ===');
        console.log('Tentative de connexion pour:', credentials.email);
        console.log('URL de connexion:', `${this.url}/connexion`);
        console.log('=== FIN DEBUG LOGIN ===');
        return this.http.post(`${this.url}/connexion` , credentials)
    }

    check_auth(){
        const token = localStorage.getItem('token');
        console.log('=== DEBUG AUTHENTIFICATION ===');
        console.log('Token utilisé pour check_auth:', token);
        console.log('Token existe:', !!token);
        console.log('Longueur du token:', token ? token.length : 0);
        
        if (!token) {
            console.log('❌ Aucun token trouvé, redirection vers login');
            this.router.navigateByUrl('/login');
            return;
        }
        
        // const token = "2|3QqCn34ISR7qNQYDrYWcEK22h3bkHLUra56RkOSp";
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          })
        console.log('Headers envoyés:', headers);
        console.log('URL de l\'API:', `${this.url}/check`);
        console.log('=== FIN DEBUG AUTHENTIFICATION ===');
        return this.http.get(`${this.url}/check` , {headers})
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
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

