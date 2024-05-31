import { Component } from '@angular/core';
interface Product {
  id: number;
  name: string;
  price: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 20.00 },
    { id: 3, name: 'Product 3', price: 30.00 },
  ];

  selectedProduct: Product | null = null;

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }
}
