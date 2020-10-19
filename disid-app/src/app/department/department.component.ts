import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Department } from './department.model';
import { DialogComponent } from './../dialog/dialog.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
  displayedColumns = ['name', 'actions'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.service.setDepartment(new Department());
    const entitiesSubscription = this.service.getAllDepartment()
    .subscribe(
      data => {
        this.departments = data;
        // this.changeDetectorRefs.detectChanges();
      },
      err => console.log(err)
    );
  }

  editDepartment(department: Department) {
    debugger
    this.service.setDepartment(department);
    this.router.navigate(['./departments/edit'], { relativeTo: this.activatedRoute });
  }

  deleteDepartment(department: Department) {
    debugger
    const dialogRef = this.dialog.open(DialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const entitiesSubscription = this.service.deleteDepartment(department)
        .subscribe(
          data => {
            this.departments = this.departments.filter(item => item._id !== department._id);
            alert('Eliminado');
          },
          err => console.log(err)
        );
      }
    });
  }

}
