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
import {
  FiGrid,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiClock,
  FiMap,
  FiUser,
  FiTrash2,
} from "react-icons/fi";
import { BsMap } from "react-icons/bs";
import { Settings } from "./Settings";

const SERVER = process.env.REACT_APP_SERVER_URL;

interface UserInterface {
  firstname: string;
  lastname: string;
  email: string;
}

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
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setGettingProjects(true);
        await Promise.all([
          getAllProjects({ dispatch }),
          getUserDetails({ setUser }),
        ]);
        setGettingProjects(false);
      } catch (error) {
        setGettingProjects(false);
      }
    })();
  }, [dispatch]);

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <BsMap className="brand-icon" />
          <span>Mastpin</span>
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FiGrid />
            <span>Overview</span>
          </div>
          <div
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <FiSettings />
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              <FiUser />
            </div>
            <div className="user-info">
              <span className="user-name">
                {user ? `${user.firstname} ${user.lastname}` : "User"}
              </span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === "overview" ? (
          <>
            {/* Header */}
            <header className="dashboard-header">
              <div className="header-content">
                <h1>My Projects</h1>
                <p className="subtitle">
                  Manage and monitor your mapping projects
                </p>
              </div>
              <div className="header-actions">
                <div className="search-bar">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className="create-btn"
                  onClick={() => createNewProject({ navigate, dispatch })}
                >
                  <FiPlus />
                  <span>New Project</span>
                </button>
              </div>
            </header>

            {/* Projects Grid */}
            <div className="projects-content">
              {gettingProjects ? (
                <div className="loading-state">
                  <GridLoader color="var(--primary-color)" size={15} />
                  <p>Loading your projects...</p>
                </div>
              ) : (
                <>
                  {projects.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <FiMap />
                      </div>
                      <h3>No Projects Yet</h3>
                      <p>
                        Start by creating your first mapping project to
                        visualize and optimize mast placements.
                      </p>
                      <button
                        className="create-btn large"
                        onClick={() => createNewProject({ navigate, dispatch })}
                      >
                        <FiPlus />
                        Create Your First Project
                      </button>
                    </div>
                  ) : (
                    <div className="projects-grid">
                      {filteredProjects.map((project) => (
                        <Link
                          key={project._id}
                          to={project._id}
                          className="project-card"
                        >
                          <div className="card-image">
                            <img
                              src={project.image || defaultMapImage}
                              alt={project.title}
                            />
                            <div className="card-overlay">
                              <button className="open-btn">Open Project</button>
                            </div>
                          </div>
                          <div className="card-content">
                            <div className="card-header">
                              <h3>{project.title}</h3>
                              <div className="card-menu">
                                <FiMoreVertical />
                              </div>
                            </div>
                            <div className="card-meta">
                              <div className="meta-item">
                                <FiClock />
                                <span>
                                  {new Date(
                                    project.updatedAt,
                                  ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="card-actions">
                              <button
                                className="action-btn delete"
                                onClick={(e) => deleteProject(project._id, e)}
                                title="Delete Project"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <Settings user={user} onUpdate={setUser} />
        )}
      </main>
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

const getUserDetails = async ({
  setUser,
}: {
  setUser: (user: UserInterface) => void;
}): Promise<void> => {
  try {
    const response = await fetch(`${SERVER}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    setUser(data.data);
  } catch (error: any) {
    // Silent fail for user details, or maybe toast error
    console.error("Failed to fetch user details:", error);
  }
};
