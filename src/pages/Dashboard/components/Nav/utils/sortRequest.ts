import {
  ConfigurationInterface,
  ConfigurationCheckInterface,
  OptimizationInterface,
  OptimizationCheckInterface,
} from "../../../../../types";

export const sortConfiguration = (
  configuration: ConfigurationInterface,
  configurationCheck: ConfigurationCheckInterface,
): ConfigurationInterface => {
  const sortedConfiguration: ConfigurationInterface = JSON.parse(
    JSON.stringify(configuration),
  );

  if (!configurationCheck.numberOfMasts.specific)
    delete sortedConfiguration.numberOfMasts.specific;
  else {
    delete sortedConfiguration.numberOfMasts.min;
    delete sortedConfiguration.numberOfMasts.max;
  }
  if (!configurationCheck.threshold.coverage)
    delete sortedConfiguration.threshold.coverage;
  if (!configurationCheck.threshold.signalStrength)
    delete sortedConfiguration.threshold.signalStrength;
  if (
    configuration.numberOfMasts.specific ||
    configuration.threshold.loadVariance
  )
    delete sortedConfiguration.threshold.loadVariance;
  return sortedConfiguration;
};

export const sortOptimization = (
  optimization: OptimizationInterface,
  optimizationCheck: OptimizationCheckInterface,
): OptimizationInterface => {
  const sortedOptimization: OptimizationInterface = JSON.parse(
    JSON.stringify(optimization),
  );

  if (!optimizationCheck.initParameters.swarmSize)
    delete sortedOptimization.initParameters.swarmSize;
  if (!optimizationCheck.initParameters.popSize)
    delete sortedOptimization.initParameters.popSize;
  if (!optimizationCheck.initParameters.kBestIndividuals)
    delete sortedOptimization.initParameters.kBestIndividuals;
  if (!optimizationCheck.initParameters.nParents)
    delete sortedOptimization.initParameters.nParents;
  if (!optimizationCheck.initParameters.breedingMethod)
    delete sortedOptimization.initParameters.breedingMethod;
  if (!optimizationCheck.initParameters.individualMutationRate)
    delete sortedOptimization.initParameters.individualMutationRate;
  if (!optimizationCheck.initParameters.geneMutationRate)
    delete sortedOptimization.initParameters.geneMutationRate;
  if (!optimizationCheck.initParameters.mutationIntensity)
    delete sortedOptimization.initParameters.mutationIntensity;
  if (!optimizationCheck.initParameters.inertia)
    delete sortedOptimization.initParameters.inertia;
  if (!optimizationCheck.initParameters.cognCoeff)
    delete sortedOptimization.initParameters.cognCoeff;
  if (!optimizationCheck.initParameters.socCoeff)
    delete sortedOptimization.initParameters.socCoeff;
  if (!optimizationCheck.initParameters.velocityMagnitude)
    delete sortedOptimization.initParameters.velocityMagnitude;
  if (!optimizationCheck.runParameters.maxGenerations)
    delete sortedOptimization.runParameters.maxGenerations;
  if (!optimizationCheck.runParameters.maxIter)
    delete sortedOptimization.runParameters.maxIter;
  if (!optimizationCheck.runParameters.scoreThreshold)
    delete sortedOptimization.runParameters.scoreThreshold;
  if (!optimizationCheck.runParameters.patience)
    delete sortedOptimization.runParameters.patience;
  if (!optimizationCheck.runParameters.tolerance)
    delete sortedOptimization.runParameters.tolerance;

  return sortedOptimization;
};
