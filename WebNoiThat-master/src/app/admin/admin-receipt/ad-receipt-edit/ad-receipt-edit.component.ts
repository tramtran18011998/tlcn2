import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Receipt } from 'src/app/corecontrol/models/receipt';
import { ReceiptService } from 'src/app/corecontrol/services/receipt.service';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ad-receipt-edit',
  templateUrl: './ad-receipt-edit.component.html',
  styleUrls: ['./ad-receipt-edit.component.css']
})
export class AdReceiptEditComponent implements OnInit {

  id: number;
  receipt: Receipt = new Receipt();
  // stateDeliveringForm: FormGroup;
  // stateDeliveredForm: FormGroup;
  // statePaidForm: FormGroup;

  stateDeliveringF: string;
  stateDeliveredF: string;
  statePaidF: string;

  constructor(private router: Router, private acroute: ActivatedRoute, private receiptService: ReceiptService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id= this.acroute.snapshot.params['id'];

    
    this.receiptService.getById(this.id).subscribe(data=>{
      console.log(data)
      this.receipt=data;

      this.stateDeliveringF = this.receipt.stateDelivering.toString();
      this.stateDeliveredF = this.receipt.stateDelivered.toString();
      this.statePaidF = this.receipt.statePaid.toString();


    },error=>console.log(error));

    // this.stateDeliveringForm = this.formBuilder.group({
    //   stateDelivering: new FormControl('')
    // });

    // this.stateDeliveredForm = this.formBuilder.group({
    //   stateDelivered: new FormControl('')
    // });

    // this.statePaidForm = this.formBuilder.group({
    //   statePaid: new FormControl('')
    // });
  }
  
  onSubmit(){


    // this.receipt.stateDelivering = this.stateDeliveringForm.controls['stateDelivering'].value;
    // this.receipt.stateDelivered = this.stateDeliveredForm.controls['stateDelivered'].value;
    // this.receipt.statePaid = this.statePaidForm.controls['statePaid'].value;


    this.receiptService.update(this.id,this.receipt).subscribe(data=>{
      console.log(data);
      
      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật!',
        showConfirmButton: false,
        timer: 1000
      })    
    },error=>console.log(error));
  }

}
