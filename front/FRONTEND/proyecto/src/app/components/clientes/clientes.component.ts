
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { error } from 'protractor';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'nit', 'creado_por', 'edit', 'delete'];
  clients: Cliente[];
  clientesForm: FormGroup;

  id: number;
  nombre: string;
  direccion: string;
  nit: string;
  // tslint:disable-next-line: variable-name
  creado_por: string;


  constructor(private clientes: ClienteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.clientesForm = this.formBuilder.group(

      {
        id: [this.id],
        nombre: [this.nombre, Validators.required],
        direccion: [this.direccion, Validators.required],
        nit: [this.nit, Validators.required],
        creado_por: [this.creado_por, Validators.required]

      }
    );
    this.clientes.getclientes().subscribe(
      data => {
        this.clients = data;
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => console.log(error)
    );
  }

  onObtenerid(Id: number): void {

    this.id = Id;
    this.clientes.getclientesid(this.id).subscribe(
      data => {
        this.clients = data;
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => console.log(error)
    );
  }
  onUpdate(cliente: Cliente): void {
    this.id = cliente.id;
    this.nombre = cliente.nombre;
    this.direccion = cliente.direccion;
    this.nit = cliente.nit;
    this.creado_por = cliente.creado_por;
  }

  onDelete(Id: number): void {

    this.id = Id;
    this.clientes.deleteClientes(this.id).subscribe(

      data => {
        console.log(data);
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => {
        return console.log(error);
      }
    );
  }


  onCreate(): void {
    if (this.id == null) {
      // tslint:disable-next-line: max-line-length
      this.clientes.Crateclinetes(this.clientesForm.get('nombre').value, this.clientesForm.get('direccion').value, this.clientesForm.get('nit').value, this.clientesForm.get('creado_por').value).subscribe(

        data => {

          console.log(data);
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error)

      );
    }
  }
  onSubmit(): void {
    if (this.id != null) {
      // tslint:disable-next-line: max-line-length
      this.clientes.upDatecliente(this.id, this.clientesForm.get('nombre').value, this.clientesForm.get('direccion').value, this.clientesForm.get('nit').value, this.clientesForm.get('creado_por').value).subscribe(

        data => {

          console.log(data);
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error)

      );
    }
  }
}
