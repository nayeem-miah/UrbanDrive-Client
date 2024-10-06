
export interface ICar {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    description: string;
    features: string[];
    category: string;
    rental_price_per_day: number;
    rental_duration: number;
    availability: boolean;
    total_price: number;
    membership: string;
    rating: number;
    review: string;
    name: string;
    date: number;
    seatCount: number;
    trip_count: number;
    plan_type: string;
}

export interface RatingData {
  label: string;
  value: number;
}