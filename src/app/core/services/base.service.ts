import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CrudService } from './crud.service';

export class BaseService<T, ID> extends CrudService<T, ID> {

  constructor(baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
  }

  get(complementUrl?: string, options?: { headers: HttpHeaders }) {
    return this.http.get(this.base + this.getComplementUrl(complementUrl), options);
  }

  post(t: T, complementUrl?: string, options?: { headers: HttpHeaders }) {
    return this.http.post(this.base + this.getComplementUrl(complementUrl), t, options ? options : this.options)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  put(id: ID, t: T, urlComplemento?: string, options?: { headers: HttpHeaders }) {
    this.resolveOptions(options);
    const complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.put(`${this.base}${complemento}/${id}`, t, options)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  patch(id: ID, t: T, urlComplemento?: string, options?: { headers: HttpHeaders }) {
    this.resolveOptions(options);
    const complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.patch(`${this.base}${complemento}/${id}`, t, options)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  search(filter: T, urlComplemento?: string, options?: { headers: HttpHeaders }) {
    this.resolveOptions(options);
    const complemento = urlComplemento ? urlComplemento : '';
    return this.http.post(`${this.base}${complemento}/consultar`, filter, this.options)
      .pipe(
        map(this.extractData),
        catchError(this.handleError));
  }

  private resolveOptions(options) {
    if (options === null) {
      this.options = options;
    }
  }

  private getComplementUrl(complementUrl: string): string {
    return complementUrl ? complementUrl : '';
  }
}
