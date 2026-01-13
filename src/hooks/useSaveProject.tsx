import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProject } from "../utils";
import { useParams } from "react-router-dom";
import { setSaved } from "../redux/actions";

const configurationSelector = createSelector(
  (state: any) => state.project.configuration,
  (state: any) => state.project.configurationCheck,
  (configuration, configurationOptions) => ({
    configuration,
    configurationOptions,
  }),
);

const optimizationSelector = createSelector(
  (state: any) => state.project.optimization,
  (state: any) => state.project.optimizationCheck,
  (optimization, optimizationOptions) => ({
    optimization,
    optimizationOptions,
  }),
);

export function useAutosave(time = 500) {
  const dispatch = useDispatch();
  const { id, publicId } = useParams();

  const title = useSelector((state: any) => state.project.details.title);
  const configuration = useSelector(configurationSelector);
  const optimization = useSelector(optimizationSelector);
  const pins = useSelector((state: any) => state.map.present.pins);
  const regions = useSelector((state: any) => state.map.present.regions);
  const currentMasts = useSelector(
    (state: any) => state.map.present.currentMasts,
  );
  const simulation = useSelector((state: any) => state.result.simulation);
  const evaluation = useSelector((state: any) => state.result.evaluation);

  const dependencies = {
    title,
    configuration,
    optimization,
    pins,
    regions,
    currentMasts,
    simulation,
    evaluation,
  };

  const dependenciesRef = useRef(dependencies);
  const firstRender = useRef(true);

  useEffect(() => {
    const newDependencies = {
      title,
      configuration,
      optimization,
      pins,
      regions,
      currentMasts,
      simulation,
      evaluation,
    };

    if (firstRender.current) {
      dependenciesRef.current = newDependencies;
      firstRender.current = false;
      return;
    }

    if (
      JSON.stringify(newDependencies) !==
      JSON.stringify(dependenciesRef.current)
    ) {
      dependenciesRef.current = newDependencies;
      dispatch(setSaved(false));
    }
  }, [
    title,
    configuration,
    optimization,
    pins,
    regions,
    currentMasts,
    simulation,
    evaluation,
    dispatch,
  ]);

  const [stateChangedFtn] = useState(() => stateChanged(dependencies));

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDependencies = dependenciesRef.current;
      if (stateChangedFtn(currentDependencies)) {
        saveProject({
          publicId: publicId as string,
          id: id as string,
          dispatch,
          dependencies: currentDependencies,
        });
      }
    }, time);
    return () => clearInterval(interval);
  }, [stateChangedFtn, time, dispatch, publicId, id]);

  const manualSave = () => {
    saveProject({
      publicId: publicId as string,
      id: id as string,
      dispatch,
      dependencies: dependenciesRef.current,
    });
  };

  return manualSave;
}

const stateChanged = (oldState: any) => {
  return (newState: any) => {
    if (JSON.stringify(oldState) !== JSON.stringify(newState)) {
      oldState = newState;
      return true;
    }
    return false;
  };
};
