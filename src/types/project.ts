export interface ProjectDetailsInterface {
  projectName: string;
  createdAt: string;
}

export interface ConfigurationInterface {
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
  algorithm: "pso" | "ga";
  initParameters: {
    swarmSize: number;
  };
  runParameters: {
    maxIterations: number;
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
