import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parameters } from '../core/models/parameters';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ParametersService extends BaseService<Parameters, string> {
  constructor(http: HttpClient) {
    super('parametrizacao', http);
  }

  findByUnidade(id: string): Observable<Parameters> {
    return this.get(`/unidade/${id}`);
  }
}
