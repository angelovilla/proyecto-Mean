import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee[] = [];
  public addEmploye: Employee = new Employee();

  constructor(private employeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeService.getEmployees().subscribe((data) => {
      this.employee = data;
      console.log(data);
    });
  }

  create() {
    console.log(this.addEmploye);

    if (this.addEmploye._id) {
      this.employeService.update(this.addEmploye).subscribe(
        (addEmploye) => {
          this.resetForm();
          this.getEmployees();
        },
        (err) => {
          console.log(err);
          if (err.status == 400) {
          }
        }
      )
    } else {
      this.employeService.create(this.addEmploye).subscribe(
        (addEmploye) => {
          this.resetForm();
          this.getEmployees();
        },
        (err) => {
          console.log(err);
          if (err.status == 400) {
          }
        }
      );
    }
  }

  edit(employee: Employee) {
    this.addEmploye = employee;
    console.log(this.addEmploye);
  }

  delete(id: string | undefined) {
    const res = confirm('Are you sure you want to delete this employee?');
    if (res) {
      this.employeService.delete(id).subscribe(
        (resp) => {
          this.getEmployees();
        },
        (err) => {
          console.log(err);
          if (err.status == 400) {
          }
        }
      );
    }
  }

  resetForm() {
    this.addEmploye = {'name':'', 'office':'', 'position':'', 'salary':0, 'createdAt':'', 'updatedAt':'', '_id':''};

  }

}
