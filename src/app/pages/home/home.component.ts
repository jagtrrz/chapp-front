import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { environment } from 'src/environments/environment';

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
    'total_price', 
    'creation_date'
  ];
  
  dataSource: any;

  PAGE_START = 0;
  PAGE_SIZE = 10;
  currentPageNumber = this.PAGE_START;
  currentPageSize = this.PAGE_SIZE;
  count = 0;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { 
    console.log(environment.api);
  }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(){
    this.unsubscribe.unsubscribe()
  }

  getData(){
    return this.apiService.getListBookings()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {

        if(response){
          this.dataSource = response.results
          this.count = response.count
        }
      })
  }

  goSearchBookingPage(){
    this.router.navigate(['booking-search'])
  }

}
