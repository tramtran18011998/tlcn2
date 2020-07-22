import { Supplier } from 'src/app/corecontrol/models/supplier';
import { SupplierService } from './../corecontrol/services/supplier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../corecontrol/services/product.service';
import { Product } from '../corecontrol/models/product';
import { ProductImage } from '../corecontrol/models/productimage';
import { CartService } from '../corecontrol/services/cart.service';
import { Cart } from '../corecontrol/models/cart';
import { Customer } from '../corecontrol/models/customer';
import { User } from '../corecontrol/models/user';
import { CustomerService } from '../corecontrol/services/customer.service';
import Swal from 'sweetalert2'
import { Category } from '../corecontrol/models/category';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  product: Product = new Product();
  productImgs: ProductImage[] = [];
  currentCustomer: Customer = new Customer();
  currentUser: User = new User();
  idCus: number;

  //for related product
  currentCategory: Category = new Category;
  productRelateds: Product[]=[];
  productRelateds2: Product[]=[];
  productRelatedImages : ProductImage[]=[];

  cart: Cart = new Cart();

  id: number;
  idImg: number;
  currentImg: string;
  quantity: number = 1;

  supplier: Supplier=new Supplier();
  idSup:number;

  //total for show number product
  quantitycart: number;

  constructor(private acroute: ActivatedRoute, private productService: ProductService, private supplierService:SupplierService ,private cartService: CartService, private customerService: CustomerService) { }

  ngOnInit() {
    this.id = this.acroute.snapshot.params['id'];

    this.currentUser = JSON.parse(localStorage.getItem('currentuser'));

    this.productService.getById(this.id).subscribe(data => {
      this.product = data;
      console.log(this.product);
      this.currentCategory = this.product.category;

      this.productService.getListRelated(this.currentCategory.id).subscribe(data =>{
        console.log(data);
        this.productRelateds2 = data;
        if(data){
          this.productRelateds =[];
          this.productRelatedImages =[];
            for(let i=0; i<this.productRelateds2.length ; i++){
                 this.productService.getProductImgByProductIdLimit(this.productRelateds2[i].id).subscribe( data1 => {
                   
                if(this.productRelateds2[i].id === data1.product.id)
                {
                  this.productRelateds.push(data1.product);
                  this.productRelatedImages.push(data1.name);   
                }
              })                    
            }     
        }
      })
    }, error => console.log(error));

    this.productService.getProductImgByProductId(this.id).subscribe(data => {
      this.productImgs = data;
      console.log(this.productImgs);
      //console.log(this.productImgs.na)
      this.currentImg = this.productImgs[0].name;
      // for(let i=0; i<this.productImgs.length;i++){
      //   this.currentImg = this.productImgs[0].name;
      // }
    }, error => console.log(error));


  }

  ImageClick(value: string) {
    console.log(value);
    this.currentImg = value;
  }

  onSearchChange(value: number) {
    this.quantity = value;
    console.log(this.quantity);
  }

  addCart() {

    if (!this.currentUser) {
      
      Swal.fire({
        icon: 'error',
        title: 'Bạn cần đăng nhập để thực hiện mua hàng!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      
      this.customerService.getIdByUserId(this.currentUser.id).subscribe(data => {
        console.log(data);
        this.idCus = data;
        
        

        this.customerService.getById(this.idCus).subscribe(data => {
          this.currentCustomer = data;
          console.log(this.currentCustomer);

          //this.cart.product = this.product;
          this.cart.productname = this.product.name;
          this.cart.price = this.product.discountPrice;
          this.cart.quantity = this.quantity;
          this.cart.status = 0;
          this.cart.totalprice = this.quantity * this.product.discountPrice;
          //this.cart.customer = this.currentCustomer;
          console.log(this.cart);
          

          this.cartService.createNew(this.product.id,this.currentCustomer.id,this.cart).subscribe(data => {
            console.log(data);
            this.cartService.countQuantity(this.idCus).subscribe(x => {
              this.quantitycart = x;
              console.log(this.quantitycart);
              //var x = this.quantitycart.toString();
              localStorage.setItem('quantitycart', this.quantitycart.toString());
              
              //location.reload();
            })
          })
          

        })
      })
    }



  }

  // getListRelated(categoryid: number){
  //   this.productService.getListRelated(categoryid).subscribe(data =>{
  //     console.log(data);
  //     this.productRelateds2 = data;
  //     if(data){
  //       this.productRelateds =[];
  //       this.productRelatedImages =[];
  //         for(let i=0; i<this.productRelateds2.length ; i++){
  //              this.productService.getProductImgByProductIdLimit(this.productRelateds2[i].id).subscribe( data1 => {
                 
  //             if(this.productRelateds2[i].id === data1.product.id)
  //             {
  //               this.productRelateds.push(data1.product);
  //               this.productRelatedImages.push(data1.name);   
  //             }
  //           })                    
  //         }     
  //     }
  //   })
  // }

}
