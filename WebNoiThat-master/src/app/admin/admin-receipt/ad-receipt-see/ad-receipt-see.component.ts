import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceProduct } from 'src/app/corecontrol/models/invoiceproduct';
import { ReceiptService } from 'src/app/corecontrol/services/receipt.service';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceProduct_Product } from 'src/app/corecontrol/models/invoiceproduct-product';

@Component({
  selector: 'app-ad-receipt-see',
  templateUrl: './ad-receipt-see.component.html',
  styleUrls: ['./ad-receipt-see.component.css']
})
export class AdReceiptSeeComponent implements OnInit {
  displayedColumns: string[] = ['product', 'invoiceProduct', 'price','quantity','totalprice'];

  dataSource ;
  invoiceproduct: InvoiceProduct = new InvoiceProduct();
  invoiceprodetails: InvoiceProduct_Product[]=[];

  nameCus: string;
  nameEmp: string;


  id: number;
  constructor(private acroute: ActivatedRoute, private receiptService: ReceiptService) { }

  ngOnInit() {

    //invoice id
    this.id = this.acroute.snapshot.params['id'];

    this.receiptService.getInvoiceById(this.id).subscribe(data => {
      this.invoiceproduct = data;
      this.receiptService.getNameCusById(this.invoiceproduct.customer.id).subscribe(a=> {
        this.nameCus = a;
      })

      this.receiptService.getNameEmpById(this.invoiceproduct.employee.id).subscribe(b=>{
        this.nameEmp = b;
      })

      this.receiptService.getInvoiceDetailById(this.invoiceproduct.id).subscribe(data2 =>{

        this.invoiceprodetails = data2;
        console.log(this.invoiceprodetails);
        this.dataSource = new MatTableDataSource(this.invoiceprodetails);
      })
    })
  }

}
