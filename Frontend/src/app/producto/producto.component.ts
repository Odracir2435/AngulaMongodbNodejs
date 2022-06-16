import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../model/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  titulo = 'Agregar producto';

  id: string | null;

  formProductos = {
    nombre : "",
    categoria : "",
    precio : "",
    cantidad: 0,
  }

  producto : Producto = {
    nombre: "",
    categoria : "",
    precio : "",
    cantidad : ""
  }

  imagen: any = [];

  search: any;

  productos: Array<any> = [];

  constructor(private sp : ProductoService, private toastr: ToastrService,private aRouter: ActivatedRoute) { 
    this.id = this.aRouter.snapshot.paramMap.get('id');
    search: String;
  }

  ngOnInit() {
    this.loadProducto();
    this.esEditar();
  }
listar(){
  this.sp.listar().subscribe(data => {
    this.productos = data.datos;
    console.log(this.productos);
  }, err => {

  });
}
 

  cargarImagen(img :any){
    this.imagen = img.target.files[0];
    console.log(this.imagen);
  }

  guardar(){

    if(this.id !== null){
      this.sp.modificar(this.formProductos, this.id).subscribe(data => {
        this.toastr.info('El producto se edito exitosamente', 'EDITADO');
        this.loadProducto();
      }, err =>{
        this.toastr.error('El producto no pudo se agregado', 'ERROR');
      })

    }else{
      this.sp.guardar(this.formProductos)
    .subscribe(data => {
      this.loadProducto();
    }, err => {
    })

    }



    
  }

  eliminar(id:any){
    this.sp.eliminar(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado', 'PRODUCTO ELIMINADO');
      this.loadProducto();

    },err =>{
      console.log(err);
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Producto';
      this.sp.ver(this.id).subscribe(data =>{
        
      })
    }
  }

  loadProducto(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this.sp.listar2(filter).subscribe(
      (data) =>{
        this.productos = data.datos
      }, (err) => {
        console.error('Error ->', err )
      }
    )
    console.log(this.search);
  }

}