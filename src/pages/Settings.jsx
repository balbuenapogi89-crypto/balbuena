import "./Settings.css";

import Sidebar from "../components/Sidebar";

import {
  FaUser,
  FaCog,
  FaPalette,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("loggedIn");

    navigate("/");

  };

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <div className="page-header">

          <h1>Settings</h1>

          <p>
            Manage your account and system preferences.
          </p>

        </div>

        <div className="settings-container">

          {/* PROFILE */}

          <div className="settings-card">

            <div className="settings-title">

              <FaUser />

              <h2>Profile Information</h2>

            </div>

            <div className="profile-box">

              <div className="profile-avatar">
                N
              </div>

              <div>

                <h3>NovaHR Administrator</h3>

                <p>admin@novahr.com</p>

                <p>System Administrator</p>

              </div>

            </div>

          </div>

          {/* SYSTEM */}

          <div className="settings-card">

            <div className="settings-title">

              <FaCog />

              <h2>System Settings</h2>

            </div>

            <div className="setting-item">

              <span>System Name</span>

              <strong>NovaHR Management</strong>

            </div>

            <div className="setting-item">

              <span>Version</span>

              <strong>1.0.0</strong>

            </div>

          </div>

          {/* APPEARANCE */}

          <div className="settings-card">

            <div className="settings-title">

              <FaPalette />

              <h2>Appearance</h2>

            </div>

            <div className="setting-item">

              <span>Theme</span>

              <strong>Pink & White</strong>

            </div>

          </div>

          {/* LOGOUT */}

          <div className="settings-card logout-card">

            <button onClick={handleLogout}>

              <FaSignOutAlt />

              Logout Account

            </button>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Settings;