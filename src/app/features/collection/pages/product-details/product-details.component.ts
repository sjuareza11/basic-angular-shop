import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { selectCurrentProductActive } from '../../store/selectors/products.selectors';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('mainProductImage', { static: false }) public mainProductImage: ElementRef | undefined;
  public currentProductActive$: Observable<Product | undefined> = this._store.select(selectCurrentProductActive);
  constructor(private _store: Store, private _location: Location) { }

  public ngOnInit(): void { }

  public changeImage(src: string) {
    (this.mainProductImage as ElementRef).nativeElement.src = src;
  }
  public goBack(): void {
    this._location.back();
  }

}





