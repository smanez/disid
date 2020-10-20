import { environment } from './../environments/environment';
import { Department } from './department/department.model';
import { Employee } from './employee/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const API_EMPLOYEE_URL = 'api/employee';
const API_DEPARTMENT_URL = 'api/department';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = environment.baseUrl;
  secret = environment.secret;
  constructor( private http: HttpClient ) { }
  httpHeaders = new HttpHeaders().set('Authorization', this.secret);
  private employeeTemp: Employee;
  private Employee = new BehaviorSubject<Employee>(this.employeeTemp);
  thisEmployeeTemp$ = this.Employee.asObservable();

  private departmentTemp: Department;
  private department = new BehaviorSubject<Department>(this.departmentTemp);
  thisDepartmentTemp$ = this.department.asObservable();

  setDepartment(jsonData: Department){
    this.department.next(jsonData);
  }

  setEmployee(jsonData: Employee){
    this.Employee.next(jsonData);
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}${API_EMPLOYEE_URL}`, { headers: this.httpHeaders } );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}${API_EMPLOYEE_URL}`, employee, { headers: this.httpHeaders } );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}${API_EMPLOYEE_URL}/${employee._id}`, employee, { headers: this.httpHeaders } );
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}${API_EMPLOYEE_URL}/${employee._id}`, { headers: this.httpHeaders } );
  }


  deleteDepartment(department: Department): Observable<Department> {
    return this.http.delete<Department>(`${this.baseUrl}${API_DEPARTMENT_URL}/${department._id}`, { headers: this.httpHeaders } );
  }

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}${API_DEPARTMENT_URL}`, { headers: this.httpHeaders } );
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}${API_DEPARTMENT_URL}`, department, { headers: this.httpHeaders } );
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}${API_DEPARTMENT_URL}/${department._id}`, department, { headers: this.httpHeaders } );
  }
}
