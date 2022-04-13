import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  URL_API = 'http://localhost:3000/api/employees';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get(this.URL_API)
      .pipe(map((response) => response as Employee[]));
  }

  create(employee: Employee): Observable<Employee> {
    return this.http
      .post(this.URL_API, employee)
      .pipe(map((response: any) => response.usuario as Employee));
  }

  delete(_id: string | undefined) {
    return this.http.delete(this.URL_API + '/' + _id);
  }

  update(employee: Employee): Observable<Employee> {
    return this.http
      .put(`${this.URL_API}/${employee._id}`, employee)
      .pipe(map((response: any) => response.usuario as Employee));
  }
}
