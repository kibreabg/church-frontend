import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/Service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  private url: string = environment.apiUrl + 'Services';

  addService(service: Service): Observable<any> {
    return this.httpClient.post<Service>(this.url, service, httpOptions);
  }

  updateService(service: Service): Observable<any> {
    return this.httpClient.put<Service>(this.url + '/' + service.id, service, httpOptions);
  }

  getService(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.url + '/' + id, httpOptions);
  }

  getServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.url, httpOptions);
  }
}
