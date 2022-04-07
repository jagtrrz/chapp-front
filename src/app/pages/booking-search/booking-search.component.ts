import * as moment_ from "moment";

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

const moment = moment_;

@Component({
  selector: 'app-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.css']
})
export class BookingSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup

  minDate: Date;
  maxDate: Date;

  unsubscribe = new Subject();

  roomsAvailable = new Subject();
  roomAvailableList: any[] = []

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date()
    this.maxDate = new Date(currentYear, 11, 31);

    this.form = this.formBuilder.group({
      check_in: ["", Validators.required],
      check_out: ["", Validators.required],
      number_of_guest: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    // if(this.route.snapshot.queryParams['params']){
    //   console.log(typeof this.route.snapshot.queryParams);

    //   const params = JSON.parse(this.route.snapshot.queryParams);

    //   console.log(params);
      
      
    //   this.doTheSearch(this.route.snapshot.queryParams)
    // }
    
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.roomsAvailable
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((rooms: any) => {

        rooms.forEach((room: any) =>{
          this.roomAvailableList.push(room)
        })
      })
  }


  search(){
    this.roomAvailableList = []
    
    const body = this.form.getRawValue()

    const checkIn = moment(body['check_in']).format('YYYY-MM-DD')
    const checkOut = moment(body['check_out']).format('YYYY-MM-DD')

    body['check_in'] = checkIn
    body['check_out'] = checkOut
    
    console.log(body);

    let params = new HttpParams();


    Object.keys(body).forEach(key => {
        params = params.append(key, body[key]);
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        params
      },
    })

    this.doTheSearch(params)
  }

  doTheSearch(params: any){
    this.apiService.getRoomAvailable(params).subscribe(
      response => {
        console.log(response);
        this.roomsAvailable.next(response)
      }
    )
  }

  bookingEvent(room: any){
    const navigationExtras: NavigationExtras = {
      state: {
        room: room,
      }
    }
    this.router.navigate(['booking-confirmation'], navigationExtras)
  }
}
