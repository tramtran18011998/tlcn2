import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType } from '../corecontrol/models/categorytype';
import { CategoryTypeService } from '../corecontrol/services/category-type.service';
import { CategoryService } from '../corecontrol/services/category.service';
import { Category } from '../corecontrol/models/category';
import { Product } from '../corecontrol/models/product';
import { ProductService } from '../corecontrol/services/product.service';
import { ProductImage } from '../corecontrol/models/productimage';

import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  totalProduct: number;
  productsPerPage = 6;
  pageIn : number;
  intSelect: number = 1;

  items = [
    {id: '1',name: 'default'},
    {id: '2',name: 'Giá thấp'},
    {id: '3',name: 'Giá cao'}
  ];

  searchF: FormGroup;

  categoryTypes: CategoryType[]= [];
  categories: Observable<Category[]>;
  catename: Array<Category>[];
  products: Product[]=[];
  products2: Product[]=[];

  ps: Product[]=[];
  productImages: ProductImage[]=[];
  pis: ProductImage[]=[];

  asc: string;
  desc: string;
  default: string;

  arr=[];
  imgname=[];
  imgPush=[];
  x: number;

  productImg: ProductImage= new ProductImage();


  constructor(private productService: ProductService,private categoryTypeService: CategoryTypeService, private categoryService:CategoryService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.productService.total().subscribe(data =>{
      this.totalProduct = data;
      console.log(this.totalProduct);
    })

    this.getList();
    this.getProductList();
    //this.geta();
    this.searchF = this.formBuilder.group({
        name: new FormControl('')
      });
  }
  getList(){

    this.categoryTypeService.getList().subscribe(data =>{
      this.categoryTypes = data;

    });
  }

  
  getProductList = () =>{
    console.log(this.intSelect);
    if(this.intSelect===1){
     this.productService.getListPage(0).subscribe( data => {
        this.products2 = [...data.content];
        if(data)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
        console.log(this.imgname);
        console.log(this.products);
      })
    }else if(this.intSelect ==2){
      this.productService.getListPageAsc(0).subscribe( data => {
        this.products2 = [...data.content];
        if(data)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
        console.log(this.imgname);
        console.log(this.products);
      })
    }else{
      this.productService.getListPageDesc(0).subscribe( data => {
        this.products2 = [...data.content];
        if(data)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
        console.log(this.imgname);
        console.log(this.products);
      })

    }
    
  }

  onChangedPage(event){

    if(this.intSelect==1){
      this.productService.getListPage(event.pageIndex).subscribe( data => {
        this.products2 = [...data.content];
        if(data)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
        console.log(this.imgname);
        console.log(this.products);
      });
    }else if(this.intSelect==2){
      this.productService.getListPageAsc(event.pageIndex).subscribe( data => {
        this.products2 = [...data.content];
        if(data)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
        console.log(this.imgname);
        console.log(this.products);
      });
    }else{
      this.productService.getListPageDesc(event.pageIndex).subscribe(data4 => {
        this.products2 = [...data4.content];
        if(data4)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
        
      });
    }

    

  }

  getCateByType(id: number){
    this.categoryService.getByType(id).subscribe(data => {
      console.log(data);
      this.categories = data;
    });   
  }

  getListByCate(id: number){
    this.productService.getListByCate(id).subscribe(data =>{
      this.products2 = [...data];
        if(data)
        this.products =[];
        this.imgname =[];
          for(let i=this.products2[0].id; i<this.products2.length + this.products2[0].id; i++){
               this.productService.getProductImgByProductIdLimit(i).subscribe( data1 => {
              if(i === data1.product.id)
              {
                this.products.push(data1.product);
                this.imgname.push(data1.name);   }
            })                    
          }
    })
  }

  getImg(id: number){
    this.productService.getProductImgByProductIdLimit(id).subscribe(data => {
      this.productImg = data;
      console.log(this.productImg.name);
    })
    
  }
  loadCategoryByType(id: number){
    this.productService.getByType(id).subscribe(data =>{
      console.log(data);
    })
  }

  onOptionsSelected(value: number){

    this.intSelect = value;
    console.log(this.intSelect);
    this.getProductList();
  }

  detail(id: number){    
    this.router.navigate(['/productdetail',id]);
    console.log(id);
  }

  onSubmitSearch(search: FormGroup){
    var name = this.searchF.controls['name'].value;
    if(name !=""){
      
      this.productService.getListSearch(name).subscribe(data => {
        this.products = data;
      })
    }
    else{
      this.products = [];
      this.imgname = [];
      this.getProductList();
    }
    
  }

}
