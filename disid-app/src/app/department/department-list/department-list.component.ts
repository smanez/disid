import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Department } from '../department.model';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
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
    this.service.getAllDepartment()
    .subscribe(
      data => {
        this.departments = data;
        // this.changeDetectorRefs.detectChanges();
      },
      err => console.log(err)
    );
  }

  editDepartment(department: Department) {
    this.service.setDepartment(department);
    this.router.navigate(['/edit'], { relativeTo: this.activatedRoute });
  }

  deleteDepartment(department: Department) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      delete: true,
      desc: '¿Está seguro que desea eliminar este departamento?'
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.deleteDepartment(department)
        .subscribe(
          data => {
            this.departments = this.departments.filter(item => item._id !== department._id);
          },
          err => console.log(err)
        );
      }
    });
  }

}
