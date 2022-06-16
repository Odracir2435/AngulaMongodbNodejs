import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    usuario : "",
    clave :  ""
  }

  constructor(private _su : UsuarioService, private r : Router,private toastr: ToastrService) { }

  ngOnInit() {
  }

  ingresar(){
    this._su.login(this.usuario).subscribe((data)=>{

      if(data.ok){
        localStorage.setItem("token",data.token);
        this.r.navigate(["usuario"]);
        this.toastr.success('Inicio sesion correctamente', 'BIENVENIDO');
      }else{
        alert(data.men);
      }

    }, err =>{
      this.toastr.error('El usuario no existe', 'ERROR');
      alert(err.error.men);
      // console.log(err);
    })
  }

}
