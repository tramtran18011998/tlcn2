import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { Cart } from '../corecontrol/models/cart';
import { CartService } from '../corecontrol/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceProduct } from '../corecontrol/models/invoiceproduct';
import { InvoiceProduct_Product } from '../corecontrol/models/invoiceproduct-product';
import { ReceiptService } from '../corecontrol/services/receipt.service';

@Component({
  selector: 'app-carthistory',
  templateUrl: './carthistory.component.html',
  styleUrls: ['./carthistory.component.css']
})
export class CarthistoryComponent implements OnInit {

  id: number;
  invoiceProducts: InvoiceProduct[]=[];
  displayedColumns: string[] = ['createdDate', 'total','choose'];
  invoiceprodetails: InvoiceProduct_Product[]=[];
  
  dataSource ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private acroute: ActivatedRoute,private cartService: CartService,private receiptService: ReceiptService) { }

  ngOnInit() {

    this.id = this.acroute.snapshot.params['id'];
    this.cartService.getHistoryByCustomer(this.id).subscribe(data => {
      this.invoiceProducts = data;
      this.dataSource = new MatTableDataSource(this.invoiceProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detail(id: number){
    console.log(id);
    this.receiptService.getInvoiceDetailById(id).subscribe(data2 =>{

      this.invoiceprodetails = data2;
      console.log(this.invoiceprodetails);
      
    })
  }

}
