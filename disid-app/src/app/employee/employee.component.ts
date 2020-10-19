import { DialogComponent } from '../dialog/dialog.component';
import { AppService } from '../app.service';
import { Employee } from './employee.model';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Department } from '../department/department.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeesComponent implements OnInit {
  employees: Employee[];
  employeesBackUp: Employee[];
  departments: Department[];
  displayedColumns = ['name', 'lastName', 'age', 'fechaAlta', 'departamento', 'actions'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: AppService,
    ) { }

  ngOnInit(): void {
    this.service.setEmployee(new Employee());
    this.service.getAllDepartment()
    .subscribe(
      data => {
        this.departments = data;
        // this.changeDetectorRefs.detectChanges();
      },
      err => console.log(err)
    );
    this.service.getAllEmployee()
    .subscribe(
      data => {
        this.employees = data;
        this.employeesBackUp = this.employees;
      },
      err => console.log(err)
    );
  }

  editEmployee(employee: Employee) {
    this.service.setEmployee(employee);
    this.router.navigate(['./employee/edit'], { relativeTo: this.activatedRoute });
  }

  deleteEmpleado(employee: Employee) {
    const dialogRef = this.dialog.open(DialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteEmployee(employee)
        .subscribe(
          data => {
            this.employees = this.employees.filter(item => item._id !== employee._id);
            alert('Eliminado');
          },
          err => console.log(err)
        );
      }
    });
  }

  filterEmployeesByName(word: any) {
    if (word.value) {
      this.employees = this.employees.filter(employee =>  employee.department?._id === word.value);
    } else {
      this.employees = this.employeesBackUp;
      this.employees = this.employees.filter(employee =>  employee.name.includes(word));
    }
  }

  saluda() {
    return 'Hola';
  }
}
