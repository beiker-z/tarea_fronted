import { Empleado } from './../classes/empleado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlbase = 'http://localhost:3000/empleados';


  constructor(private httpclients: HttpClient) { }

  getempleados(): Observable<Empleado[]> {

    return this.httpclients.get<Empleado[]>(this.urlbase);

  }


  getempleadosid(id: number): Observable<Empleado[]> {

    return this.httpclients.get<Empleado[]>(`${this.urlbase}/${id}`);

  }

  CreateEmpleados(nombr: string, cod: string, sal: number, creado_porr: string): Observable<Emp> {
    const empleado = { nombre: nombr, codigo: cod, salario: sal, creado_por: creado_porr };
    console.log(empleado);
    return this.httpclients.post<Emp>(`${this.urlbase}/add`, empleado);
  }

  // tslint:disable-next-line: variable-name
  upDateEmpleados(idc: number, nombr: string, cod: string, sal: number, creado_porr: string): Observable<Emp> {
    const empleado = { id: idc, nombre: nombr, codigo: cod, salario: sal, creado_por: creado_porr };
    console.log(empleado);
    return this.httpclients.put<Emp>(`${this.urlbase}/${empleado.id}`, empleado);
  }

  deleteEmpleados(id: number): Observable<any> {

    return this.httpclients.delete<any>(`${this.urlbase}/${id}`);


  }

}



interface Emp {
  id: number;
  nombre: string;
  codigo: string;
  salario: number;
  creado_por: string;
}


