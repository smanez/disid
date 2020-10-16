import { Departamento } from './departamentos/departamento.model';
import { Empleado } from './empleados/empleado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_EMPLEADO_URL = 'api/empleados';
const API_DEPARTAMENTO_URL = 'api/empleados';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http: HttpClient ) { }

  getAllEmpleado(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(API_EMPLEADO_URL);
  }

  getAllDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(API_DEPARTAMENTO_URL);
  }
}
