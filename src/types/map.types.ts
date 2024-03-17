import { ConfigurationInterface, OptimizationInterface } from "./project.types";

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
  configuration: ConfigurationInterface;
  optimization: OptimizationInterface;
}

export interface EvaluateMapInterface {
  pins: GeneratePinInterface[];
  regions: RegionInterface[];
  configuration: ConfigurationInterface;
  optimization: OptimizationInterface;
}

export interface MastLocInterface {
  x: number;
  y: number;
}

export type MapActionType = "hand" | "pin" | "mast" | "doc";
