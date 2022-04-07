import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { BookingConfirmationComponent } from './booking-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookingConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class BookingConfirmationModule { }