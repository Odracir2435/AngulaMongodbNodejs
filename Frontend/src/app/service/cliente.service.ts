import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  public url = "http://localhost:3000/api"

  constructor(private _http : HttpClient) { }
  guardar(cliente : Cliente) : Observable<any> {
    return this._http.post(`${this.url}/cliente`, cliente );
  }

  modificar(cliente : Cliente, id: string) : Observable<any> {
    return this._http.put(`${this.url}/cliente/${id}`, cliente);
  }
  listar() : Observable<any> {
    return this._http.get(`${this.url}/cliente`);
  }
  ver(id: string) {
    return this._http.get(`${this.url}/cliente/${id}`);
  }

  eliminar(id: string) : Observable<any> {
    return this._http.delete(`${this.url}/cliente/${id}`);
  }

  listar2(filter: string) : Observable<any> {
    return this._http.get(`${this.url}/cliente${filter}`);
  }

}



