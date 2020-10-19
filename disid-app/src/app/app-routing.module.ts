import { DepartmentComponent } from './department/department.component';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrEditEmployeeComponent } from './new-or-edit-employee/new-or-edit-employee.component';


const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employee/edit', component: NewOrEditEmployeeComponent },
  { path: 'departments', component: DepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
