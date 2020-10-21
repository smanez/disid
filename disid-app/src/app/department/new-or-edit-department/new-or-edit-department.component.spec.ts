import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditDepartmentComponent } from './new-or-edit-department.component';

describe('NewOrEditDepartmentComponent', () => {
  let component: NewOrEditDepartmentComponent;
  let fixture: ComponentFixture<NewOrEditDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrEditDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
