import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRegion, setMapAction, showMapLabels } from "../redux/actions";

export const useShortkeys = ({
  showLabels,
  setFullScreen,
}: {
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

      //   State Management
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        console.log("Undo");
      }
      if (
        (e.ctrlKey && e.key === "y") ||
        (e.ctrlKey && e.shiftKey && e.key === "z")
      ) {
        e.preventDefault();
        console.log("Redo");
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
        if (hasSimulation || hasEvaluation) dispatch(setMapAction("doc"));
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
  }, [showLabels]);
};
