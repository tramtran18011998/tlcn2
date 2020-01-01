import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { User } from '../corecontrol/models/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from '../corecontrol/services/customer.service';
import { Customer } from '../corecontrol/models/customer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  id2: number;
  customerUser: User = new User();
  inSocial = JSON.parse(localStorage.getItem('inSocial'));
  customer: Customer = new Customer();

  instatus = 0;
  imgForm: FormGroup;
  image: File;
  imgState : boolean = false;

  constructor(private acroute: ActivatedRoute,private customerService: CustomerService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.id= this.acroute.snapshot.params['id'];

    //get user by id
    this.customerService.getUserById(this.id).subscribe(data=>{
      console.log(data)
      this.customerUser=data;
      this.instatus = this.customerUser.instatus;
      if(this.customerUser.imageUrl!= null){
        this.imgState = true;
      }
    },error=>console.log(error));


    this.customerService.getIdByUserId(this.id).subscribe(data => {
      console.log(data);
      this.id2 = data;
    })
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
  onSubmitUpload(){
    const formData = new FormData();
    console.log("a: "+this.imgForm.controls['file'].value);
    if(this.imgForm.controls['file'].value!=''){

      formData.append('file', this.imgForm.get('file').value);
      this.customerService.updateImg(formData,this.id).subscribe(data => {
        console.log("h:",data);       
      })
    }
    
  }
  onSubmit(){
    this.onSubmitUpload();
    
    localStorage.setItem('currentuser', JSON.stringify(this.customerUser));
    this.customerService.updateUser(this.id,this.customerUser).subscribe(data=>{
      console.log(data);    
      
      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật!',
        showConfirmButton: false,
        timer: 1000
      })
      
      location.reload();
    },error=>console.log(error));
  
      
  }

  gotoCartHistory(){
    this.router.navigate(['/carthistory',this.id2]);
  }

}
