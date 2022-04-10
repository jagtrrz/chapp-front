export interface BookingListResponse {
    results: Bookings[];
    count: number;
    next: string;
    previous: string;
}
 
export interface Bookings {
    id: number;
    check_in: string;
    check_out: string;
    number_of_guests: number;
    total_price: number;
    locator: string;
    room_number: string;
    room: number;
    contact: Contact;
    creation_date: string;
    total_nights: number
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}
