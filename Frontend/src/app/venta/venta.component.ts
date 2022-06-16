import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  clientes: any = [];
  productos : any = [];

  productos_detalle : Array<any> = [];

  total: any = 0

  venta =  {
    cliente: "",
    producto:" ",
    cantidad: 0,
    precio: 0
  };

  constructor(private sc: ClienteService, private sp: ProductoService) { }

  ngOnInit() {
    this.sc.listar().subscribe(data =>{
      this.clientes = data;
      console.log(this.clientes);
    }, err => {

    });
    this.sp.listar().subscribe(data =>{
      this.productos = data.datos;
      console.log(this.productos);
    }, err => {

    });
  }

  poner_precio(){
    let data= this.venta.producto.split("-");
    this.venta.precio = Number(data[1]);
    console.log(this.venta.producto);

  }

  agregar(){
    let data= this.venta.producto.split("-");
    this.productos_detalle.push({
      producto_id: data[0],
      producto_nombre: data[2],
      cantidad: this.venta.cantidad,
      precio: this.venta.precio,
      subtotal: this.venta.cantidad * this.venta.precio

    });
    this.total += Number(this.venta.cantidad) * Number(this.venta.precio);
  }

}
