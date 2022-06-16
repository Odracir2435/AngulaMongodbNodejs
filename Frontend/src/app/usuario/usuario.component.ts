import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  titulo = 'Crear usuario';

  id: string | null;

  usuario : Usuario = {
    nombre : "",
    apellido : "",
    telefono : "",
    correo : "",
    usuario : "",
    clave : "",
    estado : true
  }

  usuarios: Array<Usuario> = [];
  search: any;





  constructor(private _us : UsuarioService, private toastr: ToastrService,private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    search: String;
   }

  ngOnInit() {
    /*this.listar();*/
    this.loadUsuario();
    this.esEditar();
  }

  /*listar(){
    this._us.listar().subscribe((data)=>{
      this.usuarios = data.datos;
    }, err =>{

    });
  }*/

  guardar(){
    

    if(this.id !== null) {
          this._us.modificar( this.usuario, this.id).subscribe(data => {
            this.toastr.info('El usuario se edito exitosamente', 'EDITADO');
            /*this.listar();*/
            this.loadUsuario();
          }, err =>{
            this.toastr.error('El usuario no pudo se agregado', 'ERROR');
          })
    }else{
      this._us.guardar(this.usuario).subscribe((data) =>{
        if(!data.ok){
          this.toastr.error('El usuario no pudo se agregado', 'ERROR');
        }else{
          this.toastr.success('El usuario se agrego exitosamente', 'ACEPTADO');
          /*this.listar();*/
          this.loadUsuario();
  
          this.usuario = {
            nombre : "",
            apellido : "",
            telefono : "",
            correo : "",
            usuario : "",
            clave : "",
            estado : true
          }
        }
      }, err => {
        alert(err);
      })
    }
  }

  eliminar(id:any){
    this._us.eliminar(id).subscribe(data => {
      this.toastr.error('El usuario fue eliminado', 'usuario eliminado');
      /*this.listar();*/
      this.loadUsuario();

    },err =>{
      console.log(err);
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Usuario';
      this._us.ver(this.id).subscribe(data =>{
        
      })
    }
  }

  loadUsuario(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this._us.listar2(filter).subscribe(
      (data) =>{
        this.usuarios = data.datos
      }, (err) => {
        console.error('Error ->', err )
      }
    )
    console.log(this.search);
  }

 
}
