import { Observable } from 'rxjs';

export interface ICrudService<T, ID> {
  save(t: T): Observable<Object>;
  update(id: ID, t: T): Observable<Object>;
  findOne(id: ID): Observable<T>;
  findAll(): Observable<T[]>;
  delete(id: ID): Observable<any>;
}
