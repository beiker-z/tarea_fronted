import { EmepleadoComponent } from './components/emepleado/emepleado.component';
import { AutenticacionGuard } from './autenticacion.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LoginComponent } from './components/login/login.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'menu-principal', component: MenuPrincipalComponent, children: [

      { path: 'clientes', component: ClientesComponent },
      {path: '', component: ClientesComponent },
      { path:'empleados', component: EmepleadoComponent}

    ], canActivate: [AutenticacionGuard]

  },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/menu-principal', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu-principal', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
