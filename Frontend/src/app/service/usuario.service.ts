import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  public url = "http://localhost:3000/api"

  constructor(private _http : HttpClient) { }

  guardar(usuario : Usuario) : Observable<any> {
    return this._http.post(`${this.url}/usuario`, usuario );
  }

  modificar(usuario : Usuario, id: string) : Observable<any> {
    return this._http.put(`${this.url}/usuario/${id}`, usuario);
  }

  listar() : Observable<any> {
    return this._http.get(`${this.url}/usuario`);
  }

  ver(id: string) {
    return this._http.get(`${this.url}/usuario/${id}`);
  }

  eliminar(id: string) : Observable<any> {
    return this._http.delete(`${this.url}/usuario/${id}`);
  }

  login(usuario: { usuario: string; clave: string; }) : Observable<any> {
    return this._http.post(`${this.url}/login`, usuario);
  }

  listar2(filter: string) : Observable<any> {
    return this._http.get(`${this.url}/usuario${filter}`);
  }

}
