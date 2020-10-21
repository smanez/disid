import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  displayedColumns = ['name', 'actions'];
  constructor() { }

  ngOnInit(): void {
  }
}
