import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '../core/models/unit';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UnitService extends BaseService<Unit, string> {
  constructor(http: HttpClient) {
    super('unidade', http);
  }

  getByDescricao(descricao: string) {
    return this.get(`/${descricao}`);
  }
}
