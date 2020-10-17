import { Department } from './../department/department.model';
import { Employee } from './../employee/employee.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-or-edit-employee',
  templateUrl: './new-or-edit-employee.component.html',
  styleUrls: ['./new-or-edit-employee.component.scss']
})
export class NewOrEditEmployeeComponent implements OnInit {
  selectedTab = 1;
  employee: Employee;
  employeeForm: FormGroup;
  selected: Department;
  departments: Department;
  constructor(private employeeFB: FormBuilder) { }
  createForm() {
    debugger
    this.selected = this.employee.departamento;
    const datepipe = new DatePipe('en-US');
    this.employeeForm = this.employeeFB.group({
      name: [this.employee.name, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      age: [this.employee.age],
      departamento: [this.employee.departamento, Validators.required],
      fechaAlta: [datepipe.transform(this.employee.fechaAlta, 'dd/MM/y HH:MM')],
    });
  }

  ngOnInit(): void {
    debugger
    this.createForm();
  }


  onSumbit(bol: boolean
    
    ){
  }

  reset() {
	}
}
