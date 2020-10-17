import { AppService } from '../app.service';
import { Employee } from './employee.model';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeesComponent implements OnInit {
  employees: Employee[];
  displayedColumns = ['name', 'lastName', 'age', 'fechaAlta', 'departamento', 'actions'];
  constructor(
    private service: AppService,
    private changeDetectorRefs: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    const entitiesSubscription = this.service.getAllEmployee()
    .subscribe(
      data => {
        this.employees = data;
        // this.changeDetectorRefs.detectChanges();
      },
      err => console.log(err)
    );
  }

  addEmpleado(user: Employee) {
		// this.service.setUser(user);
		// this.router.navigate(['../users/edit', user._id], { relativeTo: this.activatedRoute });
	}

  editEmpleado(emp: Employee) {
    // this.service.setUser(user);
    // this.router.navigate(['../users/edit', user._id], { relativeTo: this.activatedRoute });
  }

  deleteEmpleado(user: Employee) {
		// this.service.setUser(user);
		// this.router.navigate(['../users/edit', user._id], { relativeTo: this.activatedRoute });
	}
}
