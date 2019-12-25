import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/corecontrol/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/corecontrol/models/employee';
import { EmployeeService } from 'src/app/corecontrol/services/employee.service';
import { UserService } from 'src/app/corecontrol/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  employeeUser: User = new User();
  employee: Employee = new Employee();
  
  id: number;
  id2: number;

  instatus = 0;
  imgState : boolean = false;

  adminstate: boolean = false;

  constructor(private router: Router,private acroute: ActivatedRoute, private employeeService: EmployeeService,private userService: UserService) { }

  ngOnInit() {
    this.id = this.acroute.snapshot.params['id'];

    this.employeeService.getUserById(this.id).subscribe(data=>{
      console.log(data)
      this.employeeUser=data;
      this.instatus = this.employeeUser.instatus;

      if(this.employeeUser.imageUrl!= null){
        this.imgState = true;
      }

      this.userService.check(this.employeeUser.email).subscribe(
        (data) => {
          if (data == 'ROLE_ADMIN') {
            console.log("La Admin");
            this.adminstate = true;
          }
          else {
            this.adminstate = false;
          }
        });

    },error=>console.log(error));

    this.employeeService.getIdByUserId(this.id).subscribe(data=>{
      console.log(data)
      this.id2=data;
      this.employeeService.getById(this.id2).subscribe(data=>{
        console.log(data)
        this.employee = data;
      },error=>console.log(error));
    },error=>console.log(error));

  }


}
