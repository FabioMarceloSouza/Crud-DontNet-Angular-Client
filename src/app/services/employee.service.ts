import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { EmployeeResponse } from '../models/employeeResponse.model';
import { EmployeeUpdate } from '../models/employeeUpdate.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl: string = environment.baseUrl;

  constructor(private http : HttpClient) { }

  public getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl + '/Employee');
  }

  public getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl+'/Employee/'+id);
  }

  public createEmployee(employee : EmployeeResponse) : Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl+'/Employee', employee);
  }

  public updateEmnployee(employee: EmployeeUpdate): Observable<Employee>{
    return this.http.put<Employee>(this.baseUrl+'/Employee', employee);
  }

  public deleteEmployee(id: string): Observable<any>{
    return this.http.delete(this.baseUrl+'/Employee/'+id);
  }
}
