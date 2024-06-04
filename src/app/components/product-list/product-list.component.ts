import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
interface Product {
  id: number;
  title: string;
  price: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private apiUrl='https://api.escuelajs.co/api/v1/products';

  constructor(private http:HttpClient, private router :Router) { 

  }
  products: any[]=[];
  ngOnInit(): void {
    this.getProducts().subscribe((data:any)=>{
      console.log(data);
      this.products=data;
    })

  }

  recargarPagina() {
    window.location.reload()
   
  }
  getProducts():Observable<any>{

    return this.http.get(this.apiUrl)
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  selectedProduct: Product | null = null;

  selectProduct(product: Product) {
    this.selectedProduct = product;
    console.log(product)
    console.log(this.selectProduct)
  }

}
