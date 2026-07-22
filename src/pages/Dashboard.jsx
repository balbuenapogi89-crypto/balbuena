import { useEffect, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";
import DashboardContent from "../components/DashboardContent";

function Dashboard() {

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payroll, setPayroll] = useState([]);

  // ===========================
  // LOAD DASHBOARD DATA
  // ===========================

  useEffect(() => {

    fetchDashboardData();

    // Optional: update attendance/payroll kapag nagbago ang localStorage
    window.addEventListener("storage", fetchDashboardData);

    return () => {
      window.removeEventListener("storage", fetchDashboardData);
    };

  }, []);

  const fetchDashboardData = async () => {

    try {

      // ===========================
      // EMPLOYEES FROM MYSQL
      // ===========================

      const response = await fetch(
        "http://localhost/novahr/server/api/employees.php"
      );

      const employeeData = await response.json();

      if (Array.isArray(employeeData)) {
        setEmployees(employeeData);
      } else {
        setEmployees([]);
      }

      // ===========================
      // ATTENDANCE FROM LOCALSTORAGE
      // ===========================

      const attendanceData =
        JSON.parse(localStorage.getItem("attendance")) || [];

      setAttendance(attendanceData);

      // ===========================
      // PAYROLL FROM LOCALSTORAGE
      // ===========================

      const payrollData =
        JSON.parse(localStorage.getItem("payroll")) || [];

      setPayroll(payrollData);

    } catch (error) {

      console.error("Dashboard Error:", error);

      setEmployees([]);
      setAttendance([]);
      setPayroll([]);

    }

  };

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <div className="welcome">

          <h1>
            Welcome Back 👋
          </h1>

          <p>
            Smart Employee Management Platform
          </p>

        </div>

        <StatsCards
          employees={employees}
          attendance={attendance}
          payroll={payroll}
        />

        <DashboardContent
          employees={employees}
          attendance={attendance}
          payroll={payroll}
        />

      </main>

    </div>

  );

}

export default Dashboard;