import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listEmployee: Employee[] = [];

  constructor(private employeeSrvice: EmployeeService) { }

  ngOnInit(): void {

    this.employeeSrvice.getAllEmployees().subscribe(
      {
        next: ( data) => {
          this.listEmployee = data;
        }
      }
    );

  }

  public deleteEmployee(id: string){
    this.employeeSrvice.deleteEmployee(id).subscribe({
      next: (data) => {
        this.employeeSrvice.getAllEmployees().subscribe(
          {
            next: ( data) => {
              this.listEmployee = data;
            }
          }
        );
      }
    });
  }

}
