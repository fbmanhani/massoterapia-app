import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Parameters } from '../core/models/parameters';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  parameterRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.parameterRef = db.object('parameters');
  }

  save(params: Parameters) {
    return this.parameterRef.set(params);
  }

  get(): AngularFireObject<Parameters> {
    return this.parameterRef;
  }
}
