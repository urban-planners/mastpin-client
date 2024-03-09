export interface ProjectDetailsInterface {
  projectName: string;
  createdAt: string;
}

export interface ConfigurationInterface {
  resolution: number;
  mastLocation?: [];
  numberOfMasts: {
    specific?: number;
    min?: number;
    max?: number;
  };
  threshold: {
    coverage?: number;
    signalStrength?: number;
  };
  hataParameters: {
    mastRange: number;
    mastHeight: number;
    mastFrequency: number;
    mastEirp: number;
    receiverHeight: number;
    ssCap: number;
    citySize: "small" | "medium" | "large";
  };
}

export interface OptimizationInterface {
  algorithm: "pso" | "ga";
  initParameters: {
    swarmSize?: number;
    popSize?: number;
    kBestIndividuals?: number;
    nParents?: number;
    breedingMethod?: "average" | "random";
    individualMutationRate?: number;
    geneMutationRate?: number;
    mutationIntensity?: number;
    inertia?: number;
    cognCoeff?: number;
    socCoeff?: number;
    velocityMagnitude?: number;
  };
  runParameters: {
    maxGenerations?: number;
    maxIter?: number;
    scoreThreshold?: number;
    patience?: number;
    tolerance?: number;
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
