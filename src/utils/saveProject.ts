import { Dispatch } from "@reduxjs/toolkit";
import { setSaved } from "../redux/actions";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const saveProject = async ({
  publicId,
  id,
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
}: {
  publicId: string | null;
  id: string;
  dispatch: Dispatch;
  dependencies: {
    title: string;
    configuration: any;
    optimization: any;
    pins: any;
    regions: any;
    currentMasts: any;
    simulation: any;
    evaluation: any;
  };
}) => {
  if (publicId) return;
  try {
    const response = await fetch(`${SERVER}/projects/${id}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        configuration,
        optimization,
        pins,
        regions,
        currentMasts,
        simulation,
        evaluation,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    dispatch(setSaved(true));
  } catch (error: any) {
    console.error(error.message);
  }
};
