import { AppService } from './../app.service';
import { Empleado } from './empleado.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})


export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  displayedColumns = ['name', 'lastName', 'age', 'fechaAlta', 'departamento'];
  constructor( private service: AppService ) { }

  ngOnInit(): void {
    const entitiesSubscription = this.service.getAllEmpleado()
    .subscribe(
      data => {
        this.empleados = data;
      },
      err => console.log(err)
    );
  }

}
