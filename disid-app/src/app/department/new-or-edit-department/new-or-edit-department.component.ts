import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Department } from '../../department/department.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-new-or-edit-department',
  templateUrl: './new-or-edit-department.component.html',
  styleUrls: ['./new-or-edit-department.component.scss']
})
export class NewOrEditDepartmentComponent implements OnInit {
  selectedTab = 1;
  department: Department = new Department();
  departmentForm: FormGroup;
  hasFormErrors = false;
  newDepartment: Department;
  constructor(
    private employeeFB: FormBuilder,
    private service: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    ) { }
  createForm() {
    if (!this.department) {
      // this.department.clear();
    }

    const datepipe = new DatePipe('en-US');
    this.departmentForm = this.employeeFB.group({
      name: [this.department.name, Validators.required],
    });
  }

  ngOnInit(): void {
    this.service.thisDepartmentTemp$.subscribe((res) => {
      if (res) {
        this.department = res;
      }
    });
    this.createForm();
  }

  prepareDepartment(): Department {
    const controls = this.departmentForm.controls;
    const newDepartment = new Department();
    newDepartment._id = this.department?._id;
    newDepartment.name = controls.name.value;
    return newDepartment;
  }

  createEmployee(newDepartment: Department) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      desc: 'Departamento Creado',
    };
    this.service.createDepartment(newDepartment)
    .subscribe(
      data => {
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
        setTimeout(() => {
          this.dialog.closeAll();
          this.router.navigate(['/departments'], { relativeTo: this.activatedRoute });
         }, 2000);
      },
      err => console.log(err)
    );
  }

  updateEmoployee(department: Department) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      desc: 'Departamento editado',
    };
    this.service.updateDepartment(department)
    .subscribe(
      data => {
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
        setTimeout(() => {
          this.dialog.closeAll();
          this.router.navigate(['/departments'], { relativeTo: this.activatedRoute });
         }, 2000);
      },
      err => console.log(err)
    );
  }

  onSumbit(bol: boolean) {
    this.hasFormErrors = false;
    const controls = this.departmentForm.controls;
    /** check form */
    if (this.departmentForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const editedDepartment = this.prepareDepartment();

    if (editedDepartment._id) {
      this.updateEmoployee(editedDepartment);
      return;
    }

    this.createEmployee(editedDepartment);
  }
}
