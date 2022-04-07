import * as moment_ from "moment";

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from "rxjs";

import { ApiService } from "src/app/services/api.service";

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

  roomInfo: any


  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route.paramMap.pipe(
      map(() => window.history.state),
      takeUntil(this.unsubscribe),
    ).subscribe((state) => {
      if(state.room){
        this.roomInfo = state.room
      } else {
        // 
      }
    })

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.email]
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  submitForm(){
    const contact = this.form.getRawValue()

    const checkIn = moment(this.roomInfo.check_in, 'DD-MM-YYYY').toDate()
    const checkOut = moment(this.roomInfo.check_out, 'DD-MM-YYYY').toDate()

    const _checkIn = moment(checkIn).format('YYYY-MM-DD')
    const _checkOut = moment(checkOut).format('YYYY-MM-DD')

    console.log(_checkIn);
    

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

}
