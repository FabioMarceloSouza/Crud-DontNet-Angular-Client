import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeResponse } from 'src/app/models/employeeResponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  formEmployee = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    salary: new FormControl(0,  [Validators.required]),
    departmentId: new FormControl('', [Validators.required])
  });
  departments: Department[] = [];

  constructor(
    private departmentServices: DepartmentService,
    private employeeServices: EmployeeService,
    private route: Router
    ) { }

  ngOnInit(): void {



    this.departmentServices.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      }
    });
  }

  handleFormEmployee(){
    if(this.formEmployee.invalid){
      return;
    }
    let employee : EmployeeResponse = {
      name: this.formEmployee.get('name')?.value,
      email: this.formEmployee.get('email')?.value,
      phone: this.formEmployee.get('phone')?.value,
      salary: this.formEmployee.get('salary')?.value,
      departmentId: this.formEmployee.get('departmentId')?.value,
    }
    this.employeeServices.createEmployee(employee).subscribe({
      next: (data) => {
        this.route.navigate(['/']);
      }
    })
  }

  get verificaFormEmployee() {
    return {
      name: this.formEmployee.get('name'),
      email: this.formEmployee.get('email'),
      phone: this.formEmployee.get('phone'),
      salary: this.formEmployee.get('salary'),
      departmentId: this.formEmployee.get('departmentId'),
    }
  }


}
