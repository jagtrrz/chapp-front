import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { BookingListResponse } from "../interfaces/booking.interfaces";
import { Room } from "../interfaces/rooms.interfaces";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    url: string

    constructor(
        private http: HttpClient,
    ) {
        this.url = environment.api
    }

    getListBookings(params: HttpParams): Observable<BookingListResponse>{
        const url = `${this.url}/bookings/`
        return this.http.get<BookingListResponse>(url, { params: params } )
    }

    getRoomsAvailable(params: HttpParams): Observable<Room[]>{
        const url = `${this.url}/rooms-available/`
        return this.http.get<Room[]>(url, { params: params })
    }

    getRoomAvailable(id: number, params?: HttpParams): Observable<Room>{
        const url = `${this.url}/rooms-available/${id}`
        return this.http.get<Room>(url, { params: params } )
    }

    doBooking(body: any): Observable<any>{
        const url = `${this.url}/bookings/`
        return this.http.post(url, body)
    }
}

