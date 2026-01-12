import "./Projects.css";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addToAllProjects,
  setAllProjects,
  deleteProject as deleteProjectAction,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import defaultMapImage from "../../assets/images/map-preview.webp";
import { GridLoader } from "react-spinners";
import { IoSettingsOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

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
  const [search, setSearch] = useState("");

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

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`${SERVER}/projects/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      dispatch(deleteProjectAction(id));
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="projects">
      <div className="projects__header__wrapper">
        <div className="projects__header__container">
          <div className="projects__header">
            <h2>Projects</h2>
          </div>
          <div className="projects__header__actions">
            <div className="projects__search">
              <input
                type="text"
                placeholder="Search Projects"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => createNewProject({ navigate, dispatch })}
              className="projects__create"
            >
              Create New Project
            </button>
          </div>
        </div>
      </div>
      <div className="projects__list__container">
        {gettingProjects ? (
          <div className="projects__loading">
            <GridLoader color="var(--primary-color)" />
          </div>
        ) : (
          <>
            {projects.length === 0 && (
              <div className="projects__empty">
                <h3>No Projects Found</h3>
              </div>
            )}
            {projects
              .filter((project) =>
                project.title.toLowerCase().includes(search.toLowerCase()),
              )
              .map((project) => (
                <Link
                  key={project._id}
                  to={project._id}
                  className="projects__list__item"
                >
                  <div className="projects__list__item__image">
                    <img
                      src={project.image || defaultMapImage}
                      alt={project.title}
                    />
                  </div>
                  <div>
                    <div className="projects__list__item__info">
                      <h3>{project.title}</h3>
                      <p>
                        <span>Last Modified:</span>{" "}
                        {new Date(project.updatedAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </p>
                    </div>
                    <div
                      className="projects__list__item__actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <IoSettingsOutline onClick={(e) => {}} />
                      <BsTrash onClick={() => deleteProject(project._id)} />
                    </div>
                  </div>
                </Link>
              ))}
          </>
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
