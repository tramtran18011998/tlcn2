import { CartService } from './../corecontrol/services/cart.service';
import { User } from 'src/app/corecontrol/models/user';
import { CustomerService } from './../corecontrol/services/customer.service';
import { SupplierService } from './../corecontrol/services/supplier.service';
import { Supplier } from 'src/app/corecontrol/models/supplier';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType } from '../corecontrol/models/categorytype';
import { CategoryTypeService } from '../corecontrol/services/category-type.service';
import { CategoryService } from '../corecontrol/services/category.service';
import { Category } from '../corecontrol/models/category';
import { Product } from '../corecontrol/models/product';
import { ProductService } from '../corecontrol/services/product.service';
import { ProductImage } from '../corecontrol/models/productimage';

import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';
import { Customer } from '../corecontrol/models/customer';
import Swal from 'sweetalert2';
import { Cart } from '../corecontrol/models/cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  totalProduct: number;
  productsPerPage = 12;
  pageIn: number;
  intSelect: number = 1;
  clickCateType = false;

  items = [
    { id: '1', name: 'default' },
    { id: '2', name: 'Giá thấp' },
    { id: '3', name: 'Giá cao' }
  ];

  searchF: FormGroup;

  categoryTypes: CategoryType[] = [];
  categories: Observable<Category[]>;
  catename: Array<Category>[];
  products: Product[] = [];
  products2: Product[] = [];

  suppliers: Supplier[] = [];

  ps: Product[] = [];
  productImages: ProductImage[] = [];
  pis: ProductImage[] = [];

  asc: string;
  desc: string;
  default: string;

  arr = [];
  imgname = [];
  imgPush = [];
  x: number;

  productImg: ProductImage = new ProductImage();




  currentCustomer: Customer = new Customer();
  currentUser: User = new User();
  idCus: number;
  cart: Cart = new Cart();
  product: Product = new Product();
  quantitycart: number;
  public searchval = "";

  constructor(private productService: ProductService, private cartService: CartService, private customerService: CustomerService, private supplierService: SupplierService, private categoryTypeService: CategoryTypeService, private categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.currentUser = JSON.parse(localStorage.getItem('currentuser'));

    this.productService.total().subscribe(data => {
      this.totalProduct = data;
      console.log(this.totalProduct);
    })
    this.getList();
    this.getProductList();
    //this.geta();
    this.searchF = this.formBuilder.group({
      name: new FormControl('')
    });
    this.getSupplierList();

  }
  getList() {

    this.categoryTypeService.getList().subscribe(data => {
      this.categoryTypes = data;

    });
  }

  getProductList = () => {
    if (typeof (Storage) !== "undefined") {
      this.searchval = localStorage.getItem('searchval');
      localStorage.removeItem("searchval");
    }
    if (this.searchval == null) {
      console.log("Có vào đây không ???" + this.searchval);
      

      console.log(this.intSelect);
      if (this.intSelect === 1) {
        this.productService.getListPage(0).subscribe(data => {
          this.products2 = [...data.content];
          if (data)
            this.products = [];
          this.imgname = [];
          for (let i = this.products2[0].id; i < this.products2.length + this.products2[0].id; i++) {
            this.productService.getProductImgByProductIdLimit(i).subscribe(data1 => {
              if (i === data1.product.id) {
                this.products.push(data1.product);
                this.imgname.push(data1.name);
              }
            })
          }
          console.log(this.imgname);
          console.log(this.products);
        })
      } else if (this.intSelect == 2) {
        this.productService.getListPageAsc(0).subscribe(data => {
          this.products2 = [...data.content];
          if (data)
            this.products = [];
          this.imgname = [];
          for (let i = this.products2[0].id; i < this.products2.length + this.products2[0].id; i++) {
            this.productService.getProductImgByProductIdLimit(i).subscribe(data1 => {
              if (i === data1.product.id) {
                this.products.push(data1.product);
                this.imgname.push(data1.name);
              }
            })
          }
          console.log(this.imgname);
          console.log(this.products);
        })
      } else {
        this.productService.getListPageDesc(0).subscribe(data => {
          this.products2 = [...data.content];
          if (data)
            this.products = [];
          this.imgname = [];
          for (let i = this.products2[0].id; i < this.products2.length + this.products2[0].id; i++) {
            this.productService.getProductImgByProductIdLimit(i).subscribe(data1 => {
              if (i === data1.product.id) {
                this.products.push(data1.product);
                this.imgname.push(data1.name);
              }
            })
          }
          console.log(this.imgname);
          console.log(this.products);
        })

      }
    }else{
      this.searchProduct(this.searchval);
    }

  }



  getSupplierList() {
    this.supplierService.getList().subscribe(data => {
      this.suppliers = data;
    })
  }

  onChangedPage(event) {

    if (this.intSelect == 1 && this.clickCateType == false) {
      this.productService.getListPage(event.pageIndex).subscribe(data => {
        this.products2 = [...data.content];
        if (data)
          this.products = [];
        this.imgname = [];
        for (let i = this.products2[0].id; i < this.products2.length + this.products2[0].id; i++) {
          this.productService.getProductImgByProductIdLimit(i).subscribe(data1 => {
            if (i === data1.product.id) {
              this.products.push(data1.product);
              this.imgname.push(data1.name);
            }
          })
        }
        console.log(this.imgname);
        console.log(this.products);
      });
    } else if (this.intSelect == 2 && this.clickCateType == false) {
      this.productService.getListPageAsc(event.pageIndex).subscribe(data => {
        this.products2 = [...data.content];
        if (data)
          this.products = [];
        this.imgname = [];
        for (let i = this.products2[0].id; i < this.products2.length + this.products2[0].id; i++) {
          this.productService.getProductImgByProductIdLimit(i).subscribe(data1 => {
            if (i === data1.product.id) {
              this.products.push(data1.product);
              this.imgname.push(data1.name);
            }
          })
        }
        console.log(this.imgname);
        console.log(this.products);
      });
    } else {
      this.productService.getListPageDesc(event.pageIndex).subscribe(data4 => {
        this.products2 = [...data4.content];
        if (data4)
          this.products = [];
        this.imgname = [];
        for (let i = this.products2[0].id; i < this.products2.length + this.products2[0].id; i++) {
          this.productService.getProductImgByProductIdLimit(i).subscribe(data1 => {
            if (i === data1.product.id) {
              this.products.push(data1.product);
              this.imgname.push(data1.name);
            }
          })
        }

      });
    }



  }

  getCateByType(id: number) {
    this.categoryService.getByType(id).subscribe(data => {
      console.log("naksk");
      console.log(data);
      this.categories = data;

    });
  }

  getListByCateType(id: number) {
    this.clickCateType = true;
    this.productService.getByType(id).subscribe(data => {
      this.products2 = data;
      if (data) {
        this.products = [];
        this.imgname = [];
        for (let i = 0; i < this.products2.length; i++) {
          this.productService.getProductImgByProductIdLimit(this.products2[i].id).subscribe(data1 => {

            if (this.products2[i].id === data1.product.id) {
              this.products.push(data1.product);
              this.imgname.push(data1.name);
            }
          })
        }
        this.totalProduct = this.products2.length;
        this.productsPerPage = this.totalProduct;

      }
    })
  }

  getImg(id: number) {
    this.productService.getProductImgByProductIdLimit(id).subscribe(data => {
      this.productImg = data;
      console.log(this.productImg.name);
    })

  }
  loadCategoryByType(id: number) {
    this.productService.getByType(id).subscribe(data => {
      console.log(data);
    })
  }

  onOptionsSelected(value: number) {
    console.log("nani");
    this.intSelect = value;
    console.log(this.intSelect);
    this.getProductList();
  }

  detail(id: number) {
    this.router.navigate(['/productdetail', id]);
    console.log(id);
  }


  // TÌm kiếmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm sản phẩm
  searchProduct(val) {
    console.log("Checkkkkkk??" + val);
    if (val != "") {

      // this.productService.getListSearch(val).subscribe(data => {
      //   this.products2 = data;
      //   if (data) {
      //     this.products = [];
      //     this.imgname = [];
      //     for (let i = 0; i < this.products2.length; i++) {
      //       this.productService.getProductImgByProductIdLimit(this.products2[i].id).subscribe(data1 => {

      //         if (this.products2[i].id === data1.product.id) {
      //           this.products.push(data1.product);
      //           this.imgname.push(data1.name);
      //           console.log(this.imgname);
      //         }
      //       })
      //     }
      //     this.totalProduct = this.products2.length;
      //     this.productsPerPage = this.totalProduct;
      //   }

      // })
      this.productService.getListSearch(val).subscribe(data => {
        this.products = data;
        this.imgname = [];
        for (let i = 0; i < this.products.length; i++) {
          this.productService.getProductImgByProductIdLimit(this.products[i].id).subscribe(data1 => {
            this.imgname.push(data1.name);
            console.log("Hình searchProduct:" + this.imgname);
          })
        }
      });
    }
    else {
      this.products = [];
      this.imgname = [];
      this.getProductList();
    }
  }

  searchRange(min: number, max: number) {

    if (min != 0 && max != 0) {

      this.productService.getListSearchRange(min, max).subscribe(data => {
        this.products2 = data;
        console.log(data);
        if (data) {
          this.products = [];
          this.imgname = [];
          for (let i = 0; i < this.products2.length; i++) {
            this.productService.getProductImgByProductIdLimit(this.products2[i].id).subscribe(data1 => {

              if (this.products2[i].id === data1.product.id) {
                this.products.push(data1.product);
                this.imgname.push(data1.name);
                console.log(this.imgname);
              }
            })
          }
          this.totalProduct = this.products2.length;
          this.productsPerPage = this.totalProduct;

        }


      })
    }
    else {
      this.products = [];
      this.imgname = [];
      this.getProductList();
    }
  }

  addCart(val) {

    if (!this.currentUser) {

      Swal.fire({
        icon: 'error',
        title: 'Bạn cần đăng nhập để thực hiện mua hàng!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.productService.getById(val).subscribe(dataa => {
        this.product = dataa;

        // console.log("Lấy được proooooooo" +this.product.name);
      })

      this.customerService.getIdByUserId(this.currentUser.id).subscribe(data => {
        // console.log("Lấy được custommer?????" +data);
        this.idCus = data;



        this.customerService.getById(this.idCus).subscribe(dataaa => {
          this.currentCustomer = dataaa;
          // console.log("Đây nàyyyyyyyyyyyy" +this.currentCustomer.id);

          // console.log("Cái gì đang diễn ra vậy? Gán thôi mà?" +this.product.name);

          this.cart.productname = this.product.name;
          this.cart.status = 0;
          this.cart.price = this.product.discountPrice;
          this.cart.totalprice = this.product.discountPrice;
          this.cart.quantity = 1;

          console.log(this.cart);


          this.cartService.createNew(this.product.id, this.currentCustomer.id, this.cart).subscribe(data => {
            console.log(data);
            this.cartService.countQuantity(this.idCus).subscribe(x => {
              this.quantitycart = x;
              localStorage.setItem('quantitycart', this.quantitycart.toString());
            })
          })
        })
      })
    }
  }
}
