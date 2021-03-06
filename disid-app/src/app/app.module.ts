import { Employee } from './employee/employee.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { NewOrEditEmployeeComponent } from './employee/new-or-edit-employee/new-or-edit-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOrEditDepartmentComponent } from './department/new-or-edit-department/new-or-edit-department.component';
import { DialogComponent } from './dialog/dialog.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    NewOrEditEmployeeComponent,
    DepartmentComponent,
    NewOrEditDepartmentComponent,
    DialogComponent,
    EmployeeListComponent,
    DepartmentListComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    AppRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  exports: [
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
