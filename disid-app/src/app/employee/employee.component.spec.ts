import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employee.component';

describe('EmpleadosComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return hola', () => {
    const resultado = component.saluda();
    expect(resultado).toBe('String');
  });
});
