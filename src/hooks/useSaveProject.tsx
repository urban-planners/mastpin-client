import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
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

export function useAutosave<T>(time = 500) {
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

  const [stateChangedFtn] = useState(() =>
    stateChanged({
      title,
      configuration,
      optimization,
      pins,
      regions,
      currentMasts,
      simulation,
      evaluation,
    }),
  );

  const [autoSaveFtn] = useState(() => {
    let timespent = 0;
    return (dependencies: {
      title: string;
      configuration: any;
      optimization: any;
      pins: any;
      regions: any;
      currentMasts: any;
      simulation: any;
      evaluation: any;
    }) => {
      timespent += time;
      if (timespent >= time) {
        if (stateChangedFtn(dependencies)) {
          saveProject({
            publicId: publicId as string,
            id: id as string,
            dispatch,
            dependencies,
          });
          timespent = 0;
        }
      }
    };
  });

  useEffect(() => {
    dispatch(setSaved(false));
    const interval = setInterval(
      () =>
        autoSaveFtn({
          title,
          configuration,
          optimization,
          pins,
          regions,
          currentMasts,
          simulation,
          evaluation,
        }),
      time,
    );
    return () => clearInterval(interval);
  }, [
    autoSaveFtn,
    time,
    title,
    configuration,
    optimization,
    pins,
    regions,
    currentMasts,
    simulation,
    evaluation,
  ]);

  const manualSave = () => {
    saveProject({
      publicId: publicId as string,
      id: id as string,
      dispatch,
      dependencies: {
        title,
        configuration,
        optimization,
        pins,
        regions,
        currentMasts,
        simulation,
        evaluation,
      },
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
