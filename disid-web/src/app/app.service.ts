import { Department } from './department/department.model';
import { Employee } from './employee/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_EMPLOYEE_URL = 'api/empleados';
const API_DEPARTMENT_URL = 'api/empleados';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http: HttpClient ) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_EMPLOYEE_URL);
  }

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(API_DEPARTMENT_URL);
  }
}
