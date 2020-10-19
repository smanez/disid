import { DialogComponent } from '../dialog/dialog.component';
import { AppService } from '../app.service';
import { Employee } from './employee.model';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeesComponent implements OnInit {
  employees: Employee[];
  displayedColumns = ['name', 'lastName', 'age', 'fechaAlta', 'departamento', 'actions'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: AppService,
    ) { }

  ngOnInit(): void {
    this.service.setEmployee(new Employee());
    const entitiesSubscription = this.service.getAllEmployee()
    .subscribe(
      data => {
        this.employees = data;
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
        const entitiesSubscription = this.service.deleteEmployee(employee)
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

  saluda() {
    return 'Hola';
  }
}
