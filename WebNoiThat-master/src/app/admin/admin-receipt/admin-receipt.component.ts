import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReceiptService } from 'src/app/corecontrol/services/receipt.service';
import { Receipt } from 'src/app/corecontrol/models/receipt';

@Component({
  selector: 'app-admin-receipt',
  templateUrl: './admin-receipt.component.html',
  styleUrls: ['./admin-receipt.component.css']
})
export class AdminReceiptComponent implements OnInit {

  displayedColumns: string[] = ['id','createdDate', 'updatedDate', 'invoiceProduct','stateDelivering','stateDelivered','statePaid','total','discount','amount','choose'];


  dataSource ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private receipts: Receipt[]=[];
  
  constructor(private receiptService: ReceiptService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.receiptService.getList().subscribe(data =>{
      console.log(data);
      this.receipts = data;
      console.log("sup: " +this.receipts);
      this.dataSource = new MatTableDataSource(this.receipts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  edit(id: number){
    
    this.router.navigate(['/admin/adreceipt/edit',id]);
  }

  detail(id: number){
    
    this.router.navigate(['/admin/adreceipt/detail',id]);
  }

}
