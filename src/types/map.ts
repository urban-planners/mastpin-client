export interface MapInfoInterface {
  center: google.maps.LatLngLiteral;
  zoom: number;
  options: google.maps.MapOptions | undefined;
  showLabels: boolean;
}

export interface PinInfoInterface {
  region: string;
  title: string;
  loc: google.maps.LatLngLiteral;
}

export interface RegionInterface {
  title: string;
  fillColor: string;
  strokeColor: string;
  population: number;
}
