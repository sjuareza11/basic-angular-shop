import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSearchComponent } from './components/input-search/input-search.component';



@NgModule({
  declarations: [
    InputSearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    InputSearchComponent
  ]
})
export class SharedModule { }
