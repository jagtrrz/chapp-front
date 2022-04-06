import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../material/material.module';
import { ApiService } from 'src/app/services/api.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  providers: [
    ApiService
  ]
})
export class HomeModule { }