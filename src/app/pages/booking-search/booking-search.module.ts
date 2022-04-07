import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { BookingSearchComponent } from './booking-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RoomCardModule } from 'src/app/components/room-card/room-card.module';

@NgModule({
  declarations: [
    BookingSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RoomCardModule
  ]
})
export class BookingSearchModule { }