import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/corecontrol/services/user.service';
import { EmployeeService } from 'src/app/corecontrol/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/corecontrol/models/user';

@Component({
  selector: 'app-adsidebar',
  templateUrl: './adsidebar.component.html',
  styleUrls: ['./adsidebar.component.css']
})
export class AdsidebarComponent implements OnInit {

  adminstate: boolean = false;
  currentUser: User = new User();

  constructor( private employeeService: EmployeeService,  private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('currentuser')!=null){
      this.currentUser = JSON.parse(localStorage.getItem('currentuser'));

      this.userService.check(this.currentUser.email).subscribe(
        (data) => {
          if (data == 'ROLE_ADMIN') {
            console.log("La Admin");
            this.adminstate = true;
          }
          else {
            this.adminstate = false;
          }
        });

      
    }
  }

}
