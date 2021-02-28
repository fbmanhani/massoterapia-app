import { Massagist } from './massagist';
import { Unit } from './unit';
import { User } from './user';

export class Session {
  id?: string;
  employee: User;
  massagist: Massagist;
  unit: Unit;
  dateTime?: Date;
}
