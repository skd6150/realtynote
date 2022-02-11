export interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  location: Location;
  address: string;
}
