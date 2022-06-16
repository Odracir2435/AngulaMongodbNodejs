import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proovedor } from '../model/proovedor';
import { ProovedorService } from '../service/proovedor.service';

@Component({
  selector: 'app-proovedor',
  templateUrl: './proovedor.component.html',
  styleUrls: ['./proovedor.component.css']
})
export class ProovedorComponent implements OnInit {

  titulo = 'Crear proovedor';

  id: string | null;

  proovedor : Proovedor = {
    nombre : "",
    empresa : "",
    telefono : "",
    correo : "",
  }

  proovedores: Array<Proovedor> = [];
  search: any;

  constructor(private pr : ProovedorService, private toastr: ToastrService,private aRouter: ActivatedRoute) { 
    this.id = this.aRouter.snapshot.paramMap.get('id');
    search: String;
  }

  ngOnInit() {
    this.loadProovedor();
    this.esEditar();
  }

  guardar(){
    

    if(this.id !== null) {
          this.pr.modificar( this.proovedor, this.id).subscribe(data => {
            this.toastr.info('El proovedor se edito exitosamente', 'EDITADO');
            /*this.listar();*/
            this.loadProovedor();
          }, err =>{
            this.toastr.error('El proovedor no pudo se agregado', 'ERROR');
          })
    }else{
      this.pr.guardar(this.proovedor).subscribe((data) =>{
        if(!data.ok){
          this.toastr.error('El proovedor no pudo se agregado', 'ERROR');
        }else{
          this.toastr.success('El proovedor se agrego exitosamente', 'ACEPTADO');
          /*this.listar();*/
          this.loadProovedor();
  
          this.proovedor = {
            nombre : "",
            empresa: "",
            telefono : "",
            correo : "",
          }
        }
      }, err => {
        alert(err);
      })
    }
  }

  eliminar(id:any){
    this.pr.eliminar(id).subscribe(data => {
      this.toastr.error('El proovedor fue eliminado', 'usuario eliminado');
      /*this.listar();*/
      this.loadProovedor();

    },err =>{
      console.log(err);
    })
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Proovedor';
      this.pr.ver(this.id).subscribe(data =>{
        
      })
    }
  }

  loadProovedor(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this.pr.listar2(filter).subscribe(
      (data) =>{
        this.proovedores = data.datos
      }, (err) => {
        console.error('Error ->', err )
      }
    )
    console.log(this.search);
  }


}
