import { Component, Input, OnInit } from '@angular/core';
import { Product } from './../../../../../core/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() public product: Product | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
