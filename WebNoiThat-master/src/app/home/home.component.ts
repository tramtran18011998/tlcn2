import { Component, OnInit } from '@angular/core';
import { Product } from '../corecontrol/models/product';
import { ProductService } from '../corecontrol/services/product.service';
import { ProductImage } from '../corecontrol/models/productimage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestProducts: Product[]=[];
  newProducts: Product[]=[];
  productImages: ProductImage[]=[];
  imgname=[];
  imgname2=[];

  productImg: ProductImage= new ProductImage();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getListBestSeller().subscribe(data =>{
      this.bestProducts = data;

      this.imgname2 = [];

      var b =[];
      var a: number;
      for(let i=0; i<this.bestProducts.length; i++){
        console.log('ttt:', this.bestProducts[i].id);
        b.push(this.bestProducts[i].id);
        a= this.bestProducts[i].id;
        this.productService.getProductImgByProductIdLimit(a).subscribe(data1 => {
          console.log('tt1:', this.bestProducts[i].id);
          this.productImg = data1;
          console.log(this.productImg.name);          
          this.imgname2.push(this.productImg.name)  ;        
        })                    
      }
    })

    this.productService.getListNewPro().subscribe(data1 => {
      this.newProducts = data1;

      this.imgname = [];

      var b =[];
      var a: number;
      for(let i=0; i<this.newProducts.length; i++){
        console.log('ttt:', this.newProducts[i].id);
        b.push(this.newProducts[i].id);
        a= this.newProducts[i].id;
        //console.log('a=',b);
        this.productService.getProductImgByProductIdLimit(a).subscribe(data1 => {
          console.log('tt1:', this.newProducts[i].id);
          //console.log('bb:', b);
          this.productImg = data1;
          console.log(this.productImg.name);          
          this.imgname.push(this.productImg.name)  ;         
          //console.log(this.imgname[i]);
        })                    
      }

    })
    
  }

}
