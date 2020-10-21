import { NewOrEditDepartmentComponent } from './department/new-or-edit-department/new-or-edit-department.component';
import { DepartmentComponent } from './department/department.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrEditEmployeeComponent } from './employee/new-or-edit-employee/new-or-edit-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeesComponent } from './employee/employee.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';


const routes: Routes = [
  {
    path: 'employee',
    component: EmployeesComponent,
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'edit', component: NewOrEditEmployeeComponent }
    ]
  },
  {
    path: 'departments',
    component: DepartmentComponent,
    children: [
      { path: '', component: DepartmentListComponent },
      { path: 'edit', component: NewOrEditDepartmentComponent }
    ]
  },
  { path: '**', redirectTo: 'employee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
