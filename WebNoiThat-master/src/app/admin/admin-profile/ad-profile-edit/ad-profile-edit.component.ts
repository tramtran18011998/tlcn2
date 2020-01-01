import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/corecontrol/services/employee.service';
import { Employee } from 'src/app/corecontrol/models/employee';
import { User } from 'src/app/corecontrol/models/user';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/corecontrol/services/user.service';

@Component({
  selector: 'app-ad-profile-edit',
  templateUrl: './ad-profile-edit.component.html',
  styleUrls: ['./ad-profile-edit.component.css']
})
export class AdProfileEditComponent implements OnInit {

  id: number;
  id2: number;
  employeeUser: User = new User();
  employee: Employee = new Employee();

  instatus = 0;
  imgForm: FormGroup;
  image: File;

  adminstate: boolean = false;

  constructor(private acroute: ActivatedRoute, private employeeService: EmployeeService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.id = this.acroute.snapshot.params['id'];

    //get user by id
    this.employeeService.getUserById(this.id).subscribe(data => {
      console.log(data)
      this.employeeUser = data;
      this.instatus = this.employeeUser.instatus;

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

    }, error => console.log(error));


    //get id employee by user id
    this.employeeService.getIdByUserId(this.id).subscribe(data => {
      console.log(data)
      this.id2 = data;

      //get employee by id
      this.employeeService.getById(this.id2).subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));

    }, error => console.log(error));

    this.imgForm = this.formBuilder.group({
      file: new FormControl('')
    });

  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.images = file;
      this.imgForm.controls['file'].setValue(file);
    }


  }
  onSubmitUpload() {
    const formData = new FormData();
    console.log("a: " + this.imgForm.controls['file'].value);
    if (this.imgForm.controls['file'].value != '') {

      formData.append('file', this.imgForm.get('file').value);
      this.employeeService.updateImg(formData, this.id).subscribe(data => {
        console.log(data);
      })
    }

  }
  onSubmit() {
    this.onSubmitUpload();
    this.employeeService.update(this.id2, this.employee).subscribe(data2 => {
      console.log("e: " + data2);
    });

    this.employeeService.updateUser(this.id, this.employeeUser).subscribe(data => {
      console.log(data);
    }, error => console.log(error));

    
    Swal.fire({
      icon: 'success',
      title: 'Đã cập nhật!',
      showConfirmButton: false,
      timer: 1000
    })
  }

}
