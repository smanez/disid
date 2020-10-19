import { Department } from './department/department.model';
import { Employee } from './employee/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const API_EMPLOYEE_URL = 'api/employee';
const API_DEPARTMENT_URL = 'api/department';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http: HttpClient ) { }
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
    return this.http.get<Employee[]>(API_EMPLOYEE_URL);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_EMPLOYEE_URL, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_EMPLOYEE_URL}/${employee._id}`, employee);
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${API_EMPLOYEE_URL}/${employee._id}`);
  }


  deleteDepartment(department: Department): Observable<Department> {
    return this.http.delete<Department>(`${API_DEPARTMENT_URL}/${department._id}`);
  }


  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(API_DEPARTMENT_URL);
  }
}
