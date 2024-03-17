import { NavigateFunction, useNavigate } from "react-router-dom";
import "./Projects.css";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addToAllProjects, setAllProjects } from "../../redux/actions";
import { useEffect, useState } from "react";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gettingProjects, setGettingProjects] = useState(false);
  const projects = useSelector((state: any) => state.project.allProjects) as {
    _id: string;
    title: string;
    [props: string]: any;
  }[];

  useEffect(() => {
    (async () => {
      try {
        setGettingProjects(true);
        await getAllProjects({ dispatch });
        setGettingProjects(false);
      } catch (error) {
        setGettingProjects(false);
      }
    })();
  }, []);

  return (
    <div className="projects">
      <button onClick={() => createNewProject({ navigate, dispatch })}>
        Create New Project
      </button>
      <div>
        {gettingProjects ? (
          <p>Retrieving projects...</p>
        ) : (
          projects.map((project) => (
            <div key={project._id}>
              <p>{project.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const createNewProject = async ({
  navigate,
  dispatch,
}: {
  navigate: NavigateFunction;
  dispatch: Dispatch;
}): Promise<void> => {
  try {
    const response = await fetch(`${SERVER}/projects/new`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    dispatch(addToAllProjects(data.data));
    toast.success(data.message, {
      autoClose: 1500,
      onClose: () => navigate(`/dashboard/${data.data._id}`),
    });
  } catch (error: any) {
    toast.error(error.message);
  }
};

const getAllProjects = async ({
  dispatch,
}: {
  dispatch: Dispatch;
}): Promise<void> => {
  try {
    const response = await fetch(`${SERVER}/projects/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    dispatch(setAllProjects(data.data));
  } catch (error: any) {
    toast.error(error.message);
  }
};
