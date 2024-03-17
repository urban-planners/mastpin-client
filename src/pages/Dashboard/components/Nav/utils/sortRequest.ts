import {
  ConfigurationInterface,
  ConfigurationCheckInterface,
  OptimizationInterface,
  OptimizationCheckInterface,
  PinInfoInterface,
  RegionInterface,
  GeneratePinInterface,
} from "../../../../../types";

export const sortConfiguration = (
  currentMasts: PinInfoInterface[],
  configuration: ConfigurationInterface,
  configurationCheck: ConfigurationCheckInterface,
): ConfigurationInterface => {
  const sortedConfiguration: ConfigurationInterface = JSON.parse(
    JSON.stringify(configuration),
  );

  sortedConfiguration.mastLocation = currentMasts.map((mast) => ({
    x: mast.loc.lng,
    y: mast.loc.lat,
  }));
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

export function assignRegionsToPins(
  pins: PinInfoInterface[],
  regions: RegionInterface[],
): GeneratePinInterface[] {
  const result: GeneratePinInterface[] = [];

  pins.forEach((pin) => {
    const regionsContainingPin = regions
      .filter((region) => {
        return google.maps.geometry.poly.containsLocation(
          pin.loc,
          new google.maps.Polygon({ paths: region.bounds }),
        );
      })
      .map((region) => region.title);

    result.push({
      id: pin.id,
      regionId: pin.regionId,
      title: pin.title,
      x: pin.loc.lng,
      y: pin.loc.lat,
      regions: regionsContainingPin,
    });
  });

  return result;
}
