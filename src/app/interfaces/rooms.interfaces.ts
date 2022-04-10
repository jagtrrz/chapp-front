export interface Room {
    id: number;
    check_in: string;
    check_out: string;
    total_nights: number;
    total_price: number;
    total_available: number;
    number_of_guests: number;
    active: true;
    creation_date: string;
    created_by: string;
    update_date: string;
    update_by: string;
    room_type: string;
    price_per_night: number;
    max_guest: number;
    stock: number;
    stock_reserves: number;
    image_url: string;
}
