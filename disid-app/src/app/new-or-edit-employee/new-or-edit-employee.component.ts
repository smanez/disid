import { Department } from './../department/department.model';
import { Employee } from './../employee/employee.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-new-or-edit-employee',
  templateUrl: './new-or-edit-employee.component.html',
  styleUrls: ['./new-or-edit-employee.component.scss']
})
export class NewOrEditEmployeeComponent implements OnInit {
  selectedTab = 1;
  employee: Employee = new Employee();
  employeeForm: FormGroup;
  selected: Department;
  departments: Department[];
  hasFormErrors = false;
  newEmployee: Employee;
  constructor(
    private employeeFB: FormBuilder,
    private service: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }
  createForm() {
    if (!this.employee) {
      this.employee.clear();
    }
    debugger
    this.selected = this.employee.department;
    const datepipe = new DatePipe('en-US');
    this.employeeForm = this.employeeFB.group({
      name: [this.employee.name, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      age: [this.employee.age],
      department: [this.employee.department, Validators.required],
      fechaAlta: new FormControl({
        value: datepipe.transform(this.employee.fechaAlta, 'dd/MM/y HH:MM'), disabled: this.employee.fechaAlta
      }),
    });
  }

  ngOnInit(): void {
    const entitiesSubscription = this.service.getAllDepartment()
    .subscribe(
      data => {
        this.departments = data;
      },
      err => console.log(err)
    );

    this.service.thisEmployeeTemp$.subscribe((res) => {
      if (res) {
        this.employee = res;
      }
    });
    this.createForm();
  }

  prepareUser(): Employee {
    const controls = this.employeeForm.controls;
    const newEmployee = new Employee();
    newEmployee._id = this.employee?._id;
    newEmployee.name = controls.name.value;
    newEmployee.lastName = controls.lastName.value;
    newEmployee.age = controls.age.value;
    newEmployee.fechaAlta = controls.fechaAlta.value;
    newEmployee.department = controls.department.value;
    return newEmployee;
  }

  createEmployee(newEmployee: Employee) {
    const entitiesSubscription = this.service.createEmployee(newEmployee)
    .subscribe(
      data => {
        alert('Empleado creado');
        setTimeout(() => {
          this.router.navigate([''], { relativeTo: this.activatedRoute });
         }, 2000);
      },
      err => console.log(err)
    );
  }

  updateEmoployee(employee: Employee) {
    const entitiesSubscription = this.service.updateEmployee(employee)
    .subscribe(
      data => {
        alert('Empleado actualizado');
        setTimeout(() => {
          this.router.navigate([''], { relativeTo: this.activatedRoute });
         }, 2000);
      },
      err => console.log(err)
    );
  }

  onSumbit(bol: boolean) {
    this.hasFormErrors = false;
    const controls = this.employeeForm.controls;
    /** check form */
    if (this.employeeForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const editedEmploye = this.prepareUser();

    if (editedEmploye._id) {
      this.updateEmoployee(editedEmploye);
      return;
    }

    this.createEmployee(editedEmploye);
  }
}
