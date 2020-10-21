import { DialogComponent } from '../../dialog/dialog.component';
import { AppService } from '../../app.service';
import { Employee } from '.././employee.model';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Department } from '../../department/department.model';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  employeesBackUp: Employee[];
  departments: Department[];
  displayedColumns = ['name', 'lastName', 'age', 'fechaAlta', 'departamento', 'actions'];
  employeeFiter =  { name: '', department: '', antiquity: new Date(1900) };
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
    this.router.navigate(['./edit'], { relativeTo: this.activatedRoute });
  }

  deleteEmpleado(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      delete: true,
      desc: '¿Está seguro que desea eliminar este departamento?'
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteEmployee(employee)
        .subscribe(
          data => {
            this.employees = this.employees.filter(item => item._id !== employee._id);
          },
          err => console.log(err)
        );
      }
    });
  }

  filterEmployees() {
    if (this.employeeFiter) {
      this.employees = this.employeesBackUp;
      this.employees = this.employees.filter(employee =>
        employee.name.includes(this.employeeFiter.name) &&
        new Date(employee.fechaAlta).getTime() >= this.employeeFiter.antiquity?.getTime() &&
        (employee.department?._id === this.employeeFiter.department || !this.employeeFiter.department)
      );
    }
  }

  filterEmployeesByName(word: any) {
    this.employeeFiter.name = word;
    this.filterEmployees();
  }

  filterEmployeesByAntiquity(date: Date) {
    this.employeeFiter.antiquity = date;
    this.filterEmployees();
  }

  filterEmployeesByDepartment(word: any) {
    this.employeeFiter.department = word.value;
    this.filterEmployees();
  }

  saluda() {
    return 'Hola';
  }
}
