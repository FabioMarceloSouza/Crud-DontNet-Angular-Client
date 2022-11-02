import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeUpdate } from 'src/app/models/employeeUpdate.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeId: string = '';
  departments: Department[] = [];
  emmployee!: Employee;
  formEmployee: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    salary: new FormControl(0,  [Validators.required]),
    departmentId: new FormControl('', [Validators.required])
  });
  constructor(
    private routeActivated: ActivatedRoute,
    private route: Router,
    private employeeService: EmployeeService,
    private departmentServices: DepartmentService
  ) { }

  ngOnInit(): void {
    this.routeActivated.params.subscribe(p => this.employeeId = p['id']);

    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (employee : Employee) => {
        this.emmployee = employee;
        this.formEmployee.get('name')?.setValue(employee.name);
        this.formEmployee.get('email')?.setValue(employee.email);
        this.formEmployee.get('phone')?.setValue(employee.phone);
        this.formEmployee.get('salary')?.setValue(employee.salary);
        this.formEmployee.get('departmentId')?.setValue(employee.departmentId);
      }
    });

    this.departmentServices.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      }
    });

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

  public handleFormEmployee(){
    if(this.formEmployee.invalid){
      return;
    }

    let updateEmployee : EmployeeUpdate = {
      id: this.employeeId,
      name: this.formEmployee.get('name')?.value,
      email: this.formEmployee.get('email')?.value,
      phone: this.formEmployee.get('phone')?.value,
      salary: this.formEmployee.get('salary')?.value,
      departmentId: this.formEmployee.get('departmentId')?.value
    }

    this.employeeService.updateEmnployee(updateEmployee).subscribe({
      next: (data) => {
        console.log(data);
        this.route.navigate(['/']);
      }
    });
  }

}
