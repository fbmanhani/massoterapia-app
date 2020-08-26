import { ICrudService } from '../crud/crud.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



export abstract class CrudService<T, ID> implements ICrudService<T, ID> {
    protected base: string;
    protected http: HttpClient;
    protected options: {
        headers: HttpHeaders
    };

    constructor(
        base: string,
        http: HttpClient,
        options?: {
            headers: HttpHeaders
        }
    ) {
        this.base = `${environment.apiUrl}/${base}`;
        this.http = http;
        if (!options) {
            this.options = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            };
        } else {

            this.options = options;
        }
    }

    save(t: T) {
        return this.http.post(this.base, t, this.options).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    update(id: ID, t: T) {
        return this.http.put(`${this.base}/${id}`, t, this.options).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    findOne(id: ID): any {
        return this.http.get(`${this.base}/${id}`, this.options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    findAll(): any {
        return this.http.get(this.base, this.options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    delete(id: ID) {
        return this.http.delete(`${this.base}/${id}`, this.options)
            .pipe(
                map(this.extractData),
                catchError(this.handleError));
    }

    protected extractData(res: Response) {
        const body = res || res.json() || '';
        return body;
    }

    protected handleError(error: Response | any) {
        let msg: any;
        if (error instanceof Response) {
            msg = error.json() || '';
        } else {
            msg = error.error ? error.error : error.toString();
        }
        return throwError(msg);
    }

}
