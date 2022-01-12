import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/Member';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  private url: string = environment.apiUrl + 'Members';

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.url, httpOptions);
  }
}
