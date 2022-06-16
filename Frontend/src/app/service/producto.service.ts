import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  public url = "http://localhost:3000/api"

  constructor(private _http : HttpClient) { }

  guardar(infoProducto: { nombre: any; categoria: any; precio: any; cantidad: any; imagen?: string; }) : Observable<any> {

    let datos = new FormData();
    datos.append("nombre", infoProducto.nombre);
    datos.append("precio", infoProducto.precio);
    datos.append("categoria", infoProducto.categoria);
    datos.append("cantidad", infoProducto.cantidad);
   

    return this._http.post(`${this.url}/producto`, datos);
  }

  listar() : Observable<any> {
    return this._http.get(`${this.url}/producto`);
  }

  ver(id: string) {
    return this._http.get(`${this.url}/producto/${id}`);
  }

  eliminar(id: string) : Observable<any> {
    return this._http.delete(`${this.url}/producto/${id}`);
  }

  modificar(infoProducto: { nombre: any; categoria: any; precio: any; cantidad: any; imagen?: string; }, id: string) : Observable<any> {
    return this._http.put(`${this.url}/producto/${id}`, infoProducto);
  }
  listar2(filter: string) : Observable<any> {
    return this._http.get(`${this.url}/producto${filter}`);
  }
}
