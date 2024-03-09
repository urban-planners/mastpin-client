export interface MapInfoInterface {
  center: google.maps.LatLngLiteral;
  zoom: number;
  options: google.maps.MapOptions | undefined;
  showLabels: boolean;
}

export interface PinInfoInterface {
  id: string;
  regionId: string;
  title: string;
  loc: google.maps.LatLngLiteral;
}

export interface RegionInterface {
  id: string;
  title: string;
  bounds: google.maps.LatLngLiteral[];
  fillColor: string;
  strokeColor: string;
  population: number;
}

export interface GeneratePinInterface {
  id: string;
  regionId: string;
  title: string;
  x: number;
  y: number;
  regions: string[];
}

export interface GenerateMapInterface {
  regions: RegionInterface[];
  pins: GeneratePinInterface[];
  resolution: number;
}
