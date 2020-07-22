import { Component, OnInit } from '@angular/core';
import { Product } from '../corecontrol/models/product';
import { ProductService } from '../corecontrol/services/product.service';
import { ProductImage } from '../corecontrol/models/productimage';
import { UserService } from '../corecontrol/services/user.service';
import { User } from '../corecontrol/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestProducts: Product[]=[];
  bestProducts2: Product[]=[];
  newProducts: Product[]=[];
  newProducts2: Product[]=[];
  productImages: ProductImage[]=[];
  imgnameNP=[];
  imgnameBS=[];
  currentUser: User = new User();

  productImg: ProductImage= new ProductImage();

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    

    //this.getCurrentUser();
    if(localStorage.getItem('inSocial')){
      this.userService.getUserme().subscribe(data => {
        console.log(data);
        this.currentUser = data;
        localStorage.setItem('currentuser', JSON.stringify(this.currentUser));
        console.log(this.currentUser);
      })
    }
    

    this.productService.getListBestSeller().subscribe(data =>{
      this.bestProducts2 = data;

      console.log(data);
      if(data){
        this.bestProducts =[];
        this.imgnameBS =[];
          for(let i=0; i<this.bestProducts2.length ; i++){
               this.productService.getProductImgByProductIdLimit(this.bestProducts2[i].id).subscribe( data1 => {
                 console.log(i);
                 console.log(data1);
              if(this.bestProducts2[i].id === data1.product.id)
              {
                this.bestProducts.push(data1.product);
                this.imgnameBS.push(data1.name);  
              }
            })                    
          }
      
      }
          
    })

    this.productService.getListNewPro().subscribe(data1 => {

      this.newProducts2 = data1;

      if(data1){
        this.newProducts =[];
        this.imgnameNP =[];
          for(let i=0; i<this.newProducts2.length ; i++){
               this.productService.getProductImgByProductIdLimit(this.newProducts2[i].id).subscribe( data1 => {
                 
              if(this.newProducts2[i].id === data1.product.id)
              {
                this.newProducts.push(data1.product);
                this.imgnameNP.push(data1.name);  
              }
            })                    
          }
      
      }
    
    })
    
  }

  

}
