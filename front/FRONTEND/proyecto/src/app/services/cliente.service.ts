import { Cliente } from './../classes/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  private urlbase = 'http://localhost:3000/clientes';



  constructor(private httpclients: HttpClient) { }

  getclientes(): Observable<Cliente[]> {

    return this.httpclients.get<Cliente[]>(this.urlbase);

  }

  getclientesid(id: number): Observable<Cliente[]> {

    return this.httpclients.get<Cliente[]>(`${this.urlbase}/${id}`);

  }

  Crateclinetes(nombr: string, direccio: string, nitt: string, creado_porr: string): Observable<Client> {
    const cliente = { nombre: nombr, direccion: direccio, nit: nitt, creado_por: creado_porr };
    return this.httpclients.post<Client>(`${this.urlbase}/add`, cliente);
  }
  // tslint:disable-next-line: variable-name
  upDatecliente(idc: number, nombr: string, direccio: string, nitt: string, creado_porr: string): Observable<Client> {
    const cliente = { id: idc, nombre: nombr, direccion: direccio, nit: nitt, creado_por: creado_porr };
    console.log(cliente);
    return this.httpclients.put<Client>(`${this.urlbase}/${cliente.id}`, cliente);
  }

  deleteClientes(id: number): Observable<any> {

    return this.httpclients.delete<any>(`${this.urlbase}/${id}`);


  }

}



interface Client {
  id: number;
  nombre: string;
  direccion: string;
  nit: string;
  creado_por: string;
}
