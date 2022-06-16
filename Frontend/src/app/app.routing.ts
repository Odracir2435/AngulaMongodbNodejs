import { Router, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { ProovedorComponent } from './proovedor/proovedor.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { VentaComponent } from './venta/venta.component';

export const appRoutes: Routes = [
    { path: 'usuario', component: UsuarioComponent  },
    { path: 'editar-usuario/:id', component: UsuarioComponent  },
    { path: 'producto', component: ProductoComponent },
    { path: 'editar-producto/:id', component: ProductoComponent },
    { path: 'proovedor', component: ProovedorComponent },
    { path: 'editar-proovedor/:id', component: ProovedorComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'editar-cliente/:id', component: ClienteComponent },
    { path: 'venta', component: VentaComponent },
    { path: '',      component: LoginComponent },
    { path: '**', component: LoginComponent }
  ];