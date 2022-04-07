import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input() room: any

  roomType: string = ''
  checkIn: string = ''
  checkOut: string = ''
  roomTotalPrice: number = 0
  roomTotalNights: number = 0
  roomPricePerNight: number = 0
  roomAvailable: number = 0

  @Output() bookingEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.roomType = this.room.room_type
    this.checkIn = this.room.check_in
    this.checkOut = this.room.check_out
    this.roomTotalPrice = this.room.total_price
    this.roomTotalNights = this.room.total_nights
    this.roomPricePerNight = this.room.price_per_night
    this.roomAvailable = this.room.total_available
  }

  booking(room: any){
    console.log(event);
    
    this.bookingEvent.emit(room)
  }

}
