import {
  FaChartPie,
  FaUsers,
  FaBuilding,
  FaClipboardCheck,
  FaMoneyCheckAlt,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      navigate("/login");
    }

  };

  return (

    <aside className="sidebar">

      <div className="logo">

        <div>
          <h2>NovaHR</h2>
          <span>Management</span>
        </div>

      </div>

      <nav>

        <NavLink to="/dashboard">
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees">
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/departments">
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/attendance">
          <FaClipboardCheck />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="/payroll">
          <FaMoneyCheckAlt />
          <span>Payroll</span>
        </NavLink>

        <NavLink to="/reports">
          <FaChartBar />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>
    </aside>

  );

}

export default Sidebar;