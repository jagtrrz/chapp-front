import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

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

    getListBookings(params?: any): Observable<any>{
        const url = `${this.url}/bookings/`
        return this.http.get(url, { params: {
            page: 1
        } })
    }

    getRoomAvailable(params: any): Observable<any>{
        const url = `${this.url}/rooms/`
        return this.http.get(url, { params: params })
    }

    doBooking(body: any): Observable<any>{
        const url = `${this.url}/bookings/`
        return this.http.post(url, body)
    }

}

