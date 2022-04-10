import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

import { ApiService } from '../../services/api.service';
import { Bookings, BookingListResponse } from '../../interfaces/booking.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  displayedColumns: string[] = [
    'index', 
    'locator', 
    'room_type', 
    'number_of_guests', 
    'check_in',
    'check_out',
    'total_nights',
    'total_price',
    'contact_name',
    'contact_phone', 
    'creation_date'
  ];
  
  dataSource: Bookings[];

  PAGE_START: number = 0;
  PAGE_SIZE: number = 10;
  currentPageNumber: number = this.PAGE_START;
  currentPageSize: number = this.PAGE_SIZE;
  count = 0;
  page = 1

  params: HttpParams = new HttpParams()
    .set('page', this.page)

  constructor(
    private router: Router,
    private route: ActivatedRoute ,
    private apiService: ApiService,
  ) { 
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((params: any) => {

        const { page } = params;

        if(page) {
          this.page = page
          this.currentPageNumber = page - 1
          this.params = new HttpParams()
            .set('page', page)
          
          this.getData(this.params)
        } else {
          this.getData(this.params)
        }
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.unsubscribe.unsubscribe()
  }

  getData(params: any){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    })
    return this.apiService.getListBookings(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: BookingListResponse) => {

        if(response){
          this.dataSource = response.results
          this.count = response.count
        }
      })
  }

  pageChanged($event: PageEvent) {
    this.page = $event.pageIndex + 1
    this.currentPageNumber = $event.pageIndex

    this.params = new HttpParams()
      .set('page', this.page)

    this.getData(this.params)
  }

  goSearchBookingPage(){
    this.router.navigate(['booking-search'])
  }

}
