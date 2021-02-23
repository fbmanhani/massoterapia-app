import { Massagist } from './massagist';
import { User } from './user';

export class Session {
  id: string;
  employee: User;
  massagist: Massagist;
  dateTime: Date;
}
