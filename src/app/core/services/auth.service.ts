import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private loginurl = environment.apiUrl + 'Identity/Login';
  private registerurl = environment.apiUrl + 'Identity/Register';

  register(data: any): Observable<any> {
    return this.httpClient.post(this.registerurl, data);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(this.loginurl, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          return ((decodedToken as any).iss == 'Church Server') ? true : false;
        } else {
          return false;
        }

      } catch (ex) {
        console.log(ex);
        return false;
      }
    }
    return false;
  }
}

