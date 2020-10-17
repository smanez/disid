import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditEmployeeComponent } from './new-or-edit-employee.component';

describe('NewOrEditEmployeeComponent', () => {
  let component: NewOrEditEmployeeComponent;
  let fixture: ComponentFixture<NewOrEditEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrEditEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
