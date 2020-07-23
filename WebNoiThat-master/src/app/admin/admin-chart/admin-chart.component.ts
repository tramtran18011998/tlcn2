import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/corecontrol/services/product.service';
import { Product } from 'src/app/corecontrol/models/product';
import {Chart} from 'chart.js';
import { ChartBestProduct } from 'src/app/corecontrol/models/chartbestproduct';
import { ReceiptService } from 'src/app/corecontrol/services/receipt.service';

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.css']
})
export class AdminChartComponent implements OnInit {
  productBestSellers:Product[]=[];
  prices = [];
  xlabels =[];
  ylabels =[];
  chart ;
  chart2=[];

  chartBestProducts: ChartBestProduct[] = [];
  chartBP = new ChartBestProduct();

  //employee
  
  line;
  //revenueMonth = [];
  xReve = [];
  yReve = [];

  constructor(private productService: ProductService, private receiptService: ReceiptService) { }


  ngOnInit() {
    this.getListRevenue();
    this.getChartList();
    }

     getChartList(){
      this.productService.getChartBestSeller().subscribe(data1 => {
        this.productBestSellers = data1
  
      for(let i=0; i< this.productBestSellers.length;i++){
  
         let chartBP1 = new ChartBestProduct();
         this.productService.getChartBestSellerQuantity(this.productBestSellers[i].id).subscribe(res=>{
          chartBP1.id = this.productBestSellers[i].id;
          chartBP1.name = this.productBestSellers[i].name; 
          chartBP1.quantity = res;
          
          this.chartBestProducts.push(chartBP1);
          
          if(this.chartBestProducts.length ==10){
            for(let j=0;j< this.chartBestProducts.length;j++){
              this.ylabels.push(this.chartBestProducts[j].quantity);
              this.xlabels.push(this.chartBestProducts[j].name);
              
              if(this.ylabels.length ==10 && this.xlabels.length ==10){

                this.chart = new Chart('bar', {
                  type: 'bar',
                  options: {
                    responsive: true,
                    title: {
                      display: true,
                      text: 'Sản phẩm bán chạy'
                    },
                  },
                  data: {
                    labels: this.xlabels,
                    datasets: [
                      {
                        type: 'bar',
                        label: 'Số lượng',
                        data: this.ylabels,
                        backgroundColor: 'rgba(255,0,255,0.4)',
                        borderColor: 'rgba(255,0,255,0.4)',
                        fill: false,
                      },
                     
                    ]
                  }
                });
              }
            }
            
          }
         })
  
      }
  
      })

      
    }

    getListRevenue(){

      this.receiptService.getListMonth().subscribe(data =>{
        
        this.yReve = data;

        this.receiptService.getListTotal().subscribe(data =>{
          
          this.xReve = data;

          this.line = new Chart('line', {
            type: 'line',
            options: {
              responsive: true,
              title: {
                display: true,
                text: 'Doanh thu theo tháng trong năm'
              },
              tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                      return tooltipItem.yLabel.toLocaleString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    }
                }
            }
            },
            data: {
              labels: this.yReve,
              datasets: [
                {
                  type: 'line',
                  label: 'Số tiền',
                  data: this.xReve ,
                  backgroundColor: 'rgba(196, 23, 52, 1)',
                  borderColor: 'rgba(14, 102, 180, 1)',
                  fill: false,
                },
               
              ]
            }
          });
        })  
      })
 
    }

}
