import { Unit } from './unit';
import { User } from './user';

export class Position {
  id: string;
  employee: User;
  number: number;
  unit: Unit;
}
