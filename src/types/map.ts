export interface MapInfoInterface {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

export interface PinInfoInterface {
  region: string;
  title: string;
  pop: number;
  loc: google.maps.LatLngLiteral;
}

export interface RegionInterface {
  title: string;
  fillColor: string;
  strokeColor: string;
}
