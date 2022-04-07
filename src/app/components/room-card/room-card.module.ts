import { NgModule } from '@angular/core';
import { RoomCardComponent } from './room-card.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    RoomCardComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    RoomCardComponent
  ]
})
export class RoomCardModule { }
