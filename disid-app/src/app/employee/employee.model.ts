import { Department } from './../department/department.model';

export class Employee {
  _id: string;
  name: string;
  lastName: string;
  age: number;
  fechaAlta: Date;
  department: Department;

  clear(): void {
    this.name = '';
    this.lastName = '';
    this.age = undefined;
    this.fechaAlta = new Date();
    this.department = new Department();
  }
}
