import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  titulo = 'Crear cliente';

  id: string | null;

  cliente : Cliente = {
    nombre : "",
    direccion : "",
    telefono: ""
  }

  clientes: Array<Cliente> = [];
  search: any;

  constructor(private cl : ClienteService, private toastr: ToastrService,private aRouter: ActivatedRoute) { 
    this.id = this.aRouter.snapshot.paramMap.get('id');
    search: String;
  }

  ngOnInit() {
    this.loadCliente();
    this.esEditar();
  }

  guardar(){
    

    if(this.id !== null) {
          this.cl.modificar( this.cliente, this.id).subscribe(data => {
            this.toastr.info('El cliente se edito exitosamente', 'EDITADO');
            /*this.listar();*/
            this.loadCliente();
          }, err =>{
            this.toastr.error('El cliente no pudo se agregado', 'ERROR');
          })
    }else{
      this.cl.guardar(this.cliente).subscribe((data) =>{
        if(!data.ok){
          this.toastr.error('El cliente no pudo se agregado', 'ERROR');
        }else{
          this.toastr.success('El cliente se agrego exitosamente', 'ACEPTADO');
          /*this.listar();*/
          this.loadCliente();
  
          this.cliente = {
            nombre : "",
            telefono : "",
            direccion : "",
          }
        }
      }, err => {
        alert(err);
      })
    }
  }

  eliminar(id:any){
    this.cl.eliminar(id).subscribe(data => {
      this.toastr.error('El proovedor fue eliminado', 'usuario eliminado');
      /*this.listar();*/
      this.loadCliente();

    },err =>{
      console.log(err);
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Cliente';
      this.cl.ver(this.id).subscribe(data =>{
        
      })
    }
  }

  loadCliente(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this.cl.listar2(filter).subscribe(
      (data) =>{
        this.clientes = data
      }, (err) => {
        console.error('Error ->', err )
      }
    )
    console.log(this.search);
  }

}
