import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllDepartments(): Observable<Department[]> {

    return this.http.get<Department[]>(this.baseUrl + '/Department');
  }
}
