import { Departamento } from '../departamentos/departamento.model';

export class Empleado {
  name: string;
  lastName: string;
  age: number;
  fechaAlta: Date;
  departamento: Departamento;
}
