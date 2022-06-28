import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Role } from '../models/Role';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private usersUrl = environment.apiUrl + 'Users';
  private rolesUrl = environment.apiUrl + 'Roles';

  addUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.usersUrl, user, httpOptions);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put<User>(this.usersUrl + '/' + user.id, user, httpOptions);
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(this.usersUrl + '/' + id, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl, httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<User>(this.usersUrl + '/' + id, httpOptions);
  }

  addRole(role: Role): Observable<any> {
    return this.httpClient.post<Role>(this.rolesUrl, role, httpOptions);
  }

  updateRole(role: Role): Observable<any> {
    return this.httpClient.put<Role>(this.rolesUrl + '/' + role.id, role, httpOptions);
  }

  getRole(id: string): Observable<Role> {
    return this.httpClient.get<Role>(this.rolesUrl + '/' + id, httpOptions);
  }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.rolesUrl, httpOptions);
  }

  deleteRole(id: string): Observable<any> {
    return this.httpClient.delete<Role>(this.rolesUrl + '/' + id, httpOptions);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(this.rolesUrl + '/Login', data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        let now = Math.floor(new Date().getTime() / 1000);
        let tokenExpiry = new Date((decodedToken as any).exp).getTime();
        if (decodedToken) {
          return ((decodedToken as any).iss == 'Church Server' && tokenExpiry > now) ? true : false;
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

