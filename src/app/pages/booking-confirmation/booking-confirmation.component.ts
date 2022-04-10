import * as moment_ from "moment";

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from "rxjs";
import { Location } from "@angular/common";

import { ApiService } from "src/app/services/api.service";
import { Room } from "../../interfaces/rooms.interfaces";
import { HttpParams } from "@angular/common/http";

const moment = moment_;

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit, OnDestroy {

  form: FormGroup

  unsubscribe = new Subject();

  roomsAvailable = new Subject();
  roomAvailableList: any[] = []

  roomInfo: Room

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {

    this.route.paramMap
      .pipe(
        map(() => window.history.state),
        takeUntil(this.unsubscribe),
      ).subscribe((state) => {
        if(state.room){
          this.roomInfo = state.room
        } else {
          this.getRoomInfo() 
        }
    })

    this.form = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      email: new FormControl("", [Validators.email, Validators.required])
    })    
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  getRoomInfo() {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((params: any) => {

        const { check_in, check_out, number_of_guest, id } = params;

        if(check_in && check_out && number_of_guest) {
          let _params = new HttpParams()
            .set('check_in', check_in)
            .set('check_out', check_out)
            .set('number_of_guest', number_of_guest)
          
          this.doSearchRoom(id, _params)
          
        }
      })
  }

  doSearchRoom(id: number, params: HttpParams){
    return this.apiService.getRoomAvailable(id, params).subscribe(room => this.roomInfo = room)
  }

  submitForm(){
    const contact = this.form.getRawValue()

    const checkIn = moment(this.roomInfo.check_in, 'DD-MM-YYYY').toDate()
    const checkOut = moment(this.roomInfo.check_out, 'DD-MM-YYYY').toDate()

    const _checkIn = moment(checkIn).format('YYYY-MM-DD')
    const _checkOut = moment(checkOut).format('YYYY-MM-DD')

    const body = {
      contact: contact, 
      check_in: _checkIn,
      check_out: _checkOut, 
      number_of_guests: this.roomInfo.number_of_guests,
      total_price: this.roomInfo.total_price,
      room: this.roomInfo.id
    }

    this.apiService.doBooking(body).subscribe(
      response => {
        if(response){
          this.router.navigate(['/'])
        }
      }
    )
  }

  goBack(){
    this.location.back();
  }
}
