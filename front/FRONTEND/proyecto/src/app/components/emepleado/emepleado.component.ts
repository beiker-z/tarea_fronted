import { EmpleadoService } from './../../services/empleado.service';
import { Empleado } from './../../classes/empleado';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-emepleado',
  templateUrl: './emepleado.component.html',
  styleUrls: ['./emepleado.component.css']
})
export class EmepleadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'salario', 'creado_por', 'edit', 'delete'];
  emple: Empleado[];

  empeladosForm: FormGroup;

  id: number;
  nombre: string;
  codigo: string;
  salario: number;
  creado_por: string;



  constructor(private empleado: EmpleadoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.empeladosForm = this.formBuilder.group(

      {
        id: [this.id],
        nombre: [this.nombre, Validators.required],
        codigo: [this.codigo, Validators.required],
        salario: [this.salario, Validators.required],
        creado_por: [this.creado_por, Validators.required]

      }
    );

    this.empleado.getempleados().subscribe(
      data => this.emple = data,
      error => console.log(error)
    );
  }

  onObtenerid(Id: number): void {

    this.id = Id;
    this.empleado.getempleadosid(this.id).subscribe(
      data => {
        this.emple = data;
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => console.log(error)
    );
  }

  onUpdate(empl: Empleado): void {
    this.id = empl.id;
    this.nombre = empl.nombre;
    this.codigo = empl.codigo;
    this.salario = empl.salario;
    this.creado_por = empl.creado_por;
  }

  onDelete(Id: number): void {

    this.id = Id;
    this.empleado.deleteEmpleados(this.id).subscribe(

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
      this.empleado.CreateEmpleados(this.empeladosForm.get('nombre').value, this.empeladosForm.get('codigo').value, this.empeladosForm.get('salario').value, this.empeladosForm.get('creado_por').value).subscribe(

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
      this.empleado.upDateEmpleados(this.id, this.empeladosForm.get('nombre').value, this.empeladosForm.get('codigo').value, this.empeladosForm.get('salario').value, this.empeladosForm.get('creado_por').value).subscribe(

        data => {

          console.log(data);
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error)

      );
    }

  }
}
