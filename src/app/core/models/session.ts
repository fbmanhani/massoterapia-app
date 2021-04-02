import { Unit } from './unit';
import { User } from './user';

export class Session {
  id?: string;
  employee: User;
  massagist: User;
  unit: Unit;
  dateTime?: Date;
}
