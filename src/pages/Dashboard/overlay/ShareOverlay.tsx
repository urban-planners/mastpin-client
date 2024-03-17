import "./ShareOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import MapOverlay from "./Template";
import { setMapVisibility, showShareDisplay } from "../../../redux/actions";
import { IoLinkOutline, IoLockClosed } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import { ShareInterface } from "../../../types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SERVER = process.env.REACT_APP_SERVER_URL;

const ShareOverlay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const shareDetails = useSelector(
    (state: any) => state.project.shareDetails,
  ) as ShareInterface;
  const projectName = useSelector(
    (state: any) => state.project.details.projectName,
  ) as string;
  const [visibilityState, setVisibilityState] = useState(shareDetails.isPublic);

  useEffect(() => {
    if (visibilityState !== shareDetails.isPublic) {
      (async () => {
        try {
          const response = await fetch(`${SERVER}/projects/${id}/visibility`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              isPublic: shareDetails.isPublic,
            }),
          });
          const data = await response.json();
          if (data.error) throw new Error(data.message);
          setVisibilityState(shareDetails.isPublic);
          toast.success(
            `Your analysis is ${shareDetails.isPublic ? "now public" : "private"}`,
          );
        } catch (error: any) {
          toast.error(error.message);
        }
      })();
    }
  }, [shareDetails.isPublic]);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareDetails.link);
      toast.success("Link copied to clipboard!");
    } catch (error) {}
  };

  return (
    <MapOverlay
      title={
        <>
          Share "<span>{projectName}</span>"
        </>
      }
      onClickX={() => dispatch(showShareDisplay(false))}
    >
      <div className="map__share__container">
        <div className="map__share__content">
          <div className="analysis__visibility__container">
            Who can view analysis?
            <label>
              <input
                type="radio"
                value={"private"}
                checked={!shareDetails.isPublic}
                onChange={() => dispatch(setMapVisibility(false))}
              />
              <p>
                Only Me
                <IoLockClosed />
              </p>
            </label>
            <label>
              <input
                type="radio"
                value={"private"}
                checked={shareDetails.isPublic}
                onChange={() => dispatch(setMapVisibility(true))}
              />
              <p>
                Everybody
                <IoMdGlobe />
              </p>
            </label>
          </div>
          <label>
            <input
              type="text"
              value={shareDetails.link}
              onChange={() => {}}
              placeholder="Link to analysis..."
              disabled={!shareDetails.isPublic}
            />
          </label>
          <button disabled={!shareDetails.isPublic} onClick={copyShareLink}>
            Copy Link
            <IoLinkOutline />
          </button>
        </div>
      </div>
    </MapOverlay>
  );
};

export default ShareOverlay;
