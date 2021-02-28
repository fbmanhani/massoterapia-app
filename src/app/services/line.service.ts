import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  lineRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.lineRef = db.list('fila');
  }

  update(key: string, value: any): Promise<void> {
    return this.lineRef.update(key, { posicoes: value });
  }

  getByKey(key: string) {
    return this.db.object(`fila/${key}`);
  }
}
