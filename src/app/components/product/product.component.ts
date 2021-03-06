import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dataLoaded = false;
  products: Product[] = [];
  constructor(private productService: ProductService,  private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
    })
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44307/${serverPath}`;
  }
  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response
      console.log(this.products )
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId:string) {
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response
      this.dataLoaded = true;
    })   
  }
 

}
