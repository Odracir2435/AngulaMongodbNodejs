import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proovedor } from '../model/proovedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProovedorService {



  public url = "http://localhost:3000/api"

  constructor(private _http : HttpClient) { }

  guardar(proovedor : Proovedor) : Observable<any> {
    return this._http.post(`${this.url}/proovedor`, proovedor );
  }

  modificar(proovedor : Proovedor, id: string) : Observable<any> {
    return this._http.put(`${this.url}/proovedor/${id}`, proovedor);
  }

  listar() : Observable<any> {
    return this._http.get(`${this.url}/proovedor`);
  }

  ver(id: string) {
    return this._http.get(`${this.url}/proovedor/${id}`);
  }

  eliminar(id: string) : Observable<any> {
    return this._http.delete(`${this.url}/proovedor/${id}`);
  }

  listar2(filter: string) : Observable<any> {
    return this._http.get(`${this.url}/proovedor${filter}`);
  }

}
