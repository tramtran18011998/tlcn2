import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../corecontrol/services/product.service';
import { Product } from '../corecontrol/models/product';
import { ProductImage } from '../corecontrol/models/productimage';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  product: Product = new Product();
  productImgs: ProductImage[]=[];

  id: number;
  idImg: number;

  constructor(private acroute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.id = this.acroute.snapshot.params['id'];
    console.log(this.acroute.snapshot.params['id']);

    this.productService.getById(this.id).subscribe(data => {
      this.product = data;
      console.log(this.product);
    },error=>console.log(error));

    this.productService.getProductImgByProductId(this.id).subscribe(data => {
      this.productImgs = data;
      console.log(this.productImgs);
      //console.log(this.productImgs.na)
    },error=>console.log(error));
  }

}
