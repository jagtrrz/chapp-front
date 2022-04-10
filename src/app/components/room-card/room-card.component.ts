import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../../interfaces/rooms.interfaces';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input() room: Room

  roomType: string = ''
  checkIn: string = ''
  checkOut: string = ''
  roomTotalPrice: number = 0
  roomTotalNights: number = 0
  roomPricePerNight: number = 0
  roomAvailable: number = 0
  imageUrl: string = ''

  @Output() bookingEvent: EventEmitter<Room> = new EventEmitter<Room>();

  constructor() { }

  ngOnInit(): void {
    this.roomType = this.room.room_type
    this.checkIn = this.room.check_in
    this.checkOut = this.room.check_out
    this.roomTotalPrice = this.room.total_price
    this.roomTotalNights = this.room.total_nights
    this.roomPricePerNight = this.room.price_per_night
    this.roomAvailable = this.room.total_available
    this.imageUrl = this.room.image_url
  }

  booking(room: any){
    this.bookingEvent.emit(room)
  }
}
