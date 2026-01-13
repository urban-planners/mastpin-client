import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRegion, setMapAction, showMapLabels } from "../redux/actions";
import { MapActionType } from "../types";
import { ActionCreators } from "redux-undo";

export const useShortkeys = ({
  showLabels,
  setFullScreen,
  manualSave,
}: {
  manualSave: () => void;
  showLabels: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const hasSimulation = useSelector(
    (state: any) => state.result.hasSimulation,
  ) as boolean;
  const hasEvaluation = useSelector(
    (state: any) => state.result.hasEvaluation,
  ) as boolean;
  const selectedMapAction = useSelector(
    (state: any) => state.map.selectedMapAction,
  ) as MapActionType;

  useEffect(() => {
    const keyBindingsFtn = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      // Basic Shortkeys
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        return setFullScreen((prev) => !prev);
      }
      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        dispatch(showMapLabels(!showLabels));
      }
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        manualSave();
      }

      //   State Management
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        dispatch(ActionCreators.undo());
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        dispatch(ActionCreators.redo());
      }

      //   Map Actions
      if (e.key === "h") {
        e.preventDefault();
        dispatch(setMapAction("hand"));
      }
      if (e.key === "p") {
        e.preventDefault();
        dispatch(setMapAction("pin"));
      }
      if (e.key === "m") {
        e.preventDefault();
        dispatch(setMapAction("mast"));
      }
      if (e.key === "o") {
        e.preventDefault();
        if (hasSimulation || hasEvaluation) {
          if (selectedMapAction !== "doc") dispatch(setMapAction("doc"));
          else dispatch(setMapAction("hand"));
        }
      }

      //   Drawer Shortkeys
      if (e.key === "r" && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        dispatch(addRegion());
        dispatch(setMapAction("pin"));
      }
    };
    document.querySelector("body")?.addEventListener("keydown", keyBindingsFtn);

    return () => {
      document
        .querySelector("body")
        ?.removeEventListener("keydown", keyBindingsFtn);
    };
  }, [
    showLabels,
    setFullScreen,
    dispatch,
    hasSimulation,
    hasEvaluation,
    selectedMapAction,
    manualSave,
  ]);
};
