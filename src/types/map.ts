export interface MapInfoInterface {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

export interface PinInfoInterface {
    title: string;
    pop: number;
    loc: google.maps.LatLngLiteral;
}