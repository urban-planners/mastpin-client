import { MastLocInterface } from "./map.types";

export interface ProjectDetailsInterface {
  title: string;
  updatedAt: string;
}

export interface ConfigurationInterface {
  resolution: number | string;
  mastLocation: MastLocInterface[];
  numberOfMasts: {
    useCurrent?: boolean;
    specific?: number | string;
    min?: number | string;
    max?: number | string;
  };
  threshold: {
    coverage?: number | string;
    signalStrength?: number | string;
    loadVariance?: boolean;
  };
  hataParameters: {
    mastRange: number | string;
    mastHeight: number | string;
    mastFrequency: number | string;
    mastEirp: number | string;
    receiverHeight: number | string;
    ssCap: number | string;
    citySize: "small" | "medium" | "large";
  };
}

export interface OptimizationInterface {
  algorithm: "pso" | "ga";
  initParameters: {
    swarmSize?: number | string;
    popSize?: number | string;
    kBestIndividuals?: number | string;
    nParents?: number | string;
    breedingMethod?: "average" | "random";
    individualMutationRate?: number | string;
    geneMutationRate?: number | string;
    mutationIntensity?: number | string;
    inertia?: number | string;
    cognCoeff?: number | string;
    socCoeff?: number | string;
    velocityMagnitude?: number | string;
  };
  runParameters: {
    maxGenerations?: number | string;
    maxIter?: number | string;
    scoreThreshold?: number | string;
    patience?: number | string;
    tolerance?: number | string;
  };
}

export interface ConfigurationCheckInterface {
  numberOfMasts: {
    specific: boolean;
  };
  threshold: {
    coverage: boolean;
    signalStrength: boolean;
  };
}

export interface OptimizationCheckInterface {
  initParameters: {
    swarmSize: boolean;
    popSize: boolean;
    kBestIndividuals: boolean;
    nParents: boolean;
    breedingMethod: boolean;
    individualMutationRate: boolean;
    geneMutationRate: boolean;
    mutationIntensity: boolean;
    inertia: boolean;
    cognCoeff: boolean;
    socCoeff: boolean;
    velocityMagnitude: boolean;
  };
  runParameters: {
    maxGenerations: boolean;
    maxIter: boolean;
    scoreThreshold: boolean;
    patience: boolean;
    tolerance: boolean;
  };
}

export interface ShareInterface {
  isPublic: boolean;
  link: string;
}
