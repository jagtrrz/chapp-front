import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { BookingListComponent } from './booking-list.component';

@NgModule({
  declarations: [
    BookingListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class BookingListModule { }