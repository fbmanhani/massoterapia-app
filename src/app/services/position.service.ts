import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../core/models/position';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class PositionService extends BaseService<Position, string> {
  constructor(http: HttpClient) {
    super('posicao', http);
  }

  getAllByUnidadeId(idUnidade: string) {
    return this.get(`/${idUnidade}`);
  }

  saveAll(positions: Array<Position>) {
    return this.http.post(this.base, positions, this.options);
  }
}
