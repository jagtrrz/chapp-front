import * as moment_ from "moment";

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { Subject } from 'rxjs';
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

import { ApiService } from "src/app/services/api.service";
import { Room } from "../../interfaces/rooms.interfaces";

const moment = moment_;

@Component({
  selector: 'app-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.css']
})
export class BookingSearchComponent implements OnInit, OnDestroy {

  form: FormGroup

  minDate: Date;
  maxDate: Date;

  unsubscribe = new Subject();

  roomAvailableList: Room[] = []

  colorControl = new FormControl('primary');

  urlParams: any

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date()
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit(): void { 
    const params = this.route.snapshot.queryParams;
    const { check_in, check_out, number_of_guest } = params

    if(check_in && check_out && number_of_guest) {
      this.urlParams = {
        check_in: check_in,
        check_out: check_out, 
        number_of_guest: number_of_guest
      }
      let _params = new HttpParams()
        .set('check_in', check_in)
        .set('check_out', check_out)
        .set('number_of_guest', number_of_guest)

      this.initForm(params)
      this.doSearch(_params)
    } else {
      this.initForm(null)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  initForm(params: any){
    this.form = this.formBuilder.group({
      check_in:  new FormControl(params ? params.check_in : "", Validators.required),
      check_out:  new FormControl(params ? params.check_out : "", Validators.required),
      number_of_guest:  new FormControl(params ? params.number_of_guest : "",  [Validators.min(1), Validators.max(4), Validators.required])
    })
  }


  search(){
    this.roomAvailableList = []

    const body = this.form.getRawValue()

    const checkIn = moment(body['check_in']).format('YYYY-MM-DD')
    const checkOut = moment(body['check_out']).format('YYYY-MM-DD')

    body['check_in'] = checkIn
    body['check_out'] = checkOut

    this.urlParams = {
      check_in: checkIn,
      check_out: checkOut, 
      number_of_guest: body['number_of_guest']
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.urlParams,
    })

    let params = new HttpParams();
    Object.keys(body).forEach(key => {
      params = params.append(key, body[key]);
    });

    this.doSearch(params)
  }

  doSearch(params: HttpParams){
    return this.apiService.getRoomsAvailable(params)
      .subscribe((response: Room[]) => {
        response.forEach((room: Room) =>{
          this.roomAvailableList.push(room)
        })
      }
    )
  }

  bookingEvent(room: Room){
    const urlParams = Object.assign(this.urlParams, {id: room.id})
    const navigationExtras: NavigationExtras = {
      state: {
        room: room,
      },
      queryParams: urlParams
    }
    this.router.navigate(['booking-confirmation'], navigationExtras)
  }

  goBack(){
    this.location.back();
  }
}
