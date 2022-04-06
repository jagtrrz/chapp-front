import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { BookingComponent } from './booking.component';

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class BookingModule { }