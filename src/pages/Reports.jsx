import { useEffect, useState } from "react";
import "./Reports.css";

import Sidebar from "../components/Sidebar";

import {
  FaUsers,
  FaBuilding,
  FaClipboardCheck,
  FaMoneyCheckAlt
} from "react-icons/fa";

import {
  getAttendance
} from "../utils/attendanceStorage";

function Reports() {

  const API =
    "http://localhost/novahr/server/api/employees.php";

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // ===========================
  // LOAD REPORT DATA
  // ===========================

  useEffect(() => {

    fetchEmployees();

    setAttendance(
      getAttendance()
    );

  }, []);

  const fetchEmployees = async () => {

    try {

      const response = await fetch(API);

      const data = await response.json();

      if (Array.isArray(data)) {

        setEmployees(data);

      } else {

        setEmployees([]);

      }

    } catch (error) {

      console.error(error);

    }

  };

  // ===========================
  // REPORT COMPUTATIONS
  // ===========================

  const departments = new Set(

    employees.map(
      (emp) => emp.department
    )

  ).size;

  const present = attendance.filter(

    (item) =>

      item.status === "Present"

  ).length;

  const absent = attendance.filter(

    (item) =>

      item.status === "Absent"

  ).length;

  const totalSalary = employees.reduce(

    (total, emp) =>

      total + Number(emp.salary || 0),

    0

  );

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <div className="page-header">

          <h1>
            Reports
          </h1>

          <p>
            Company analytics and performance overview.
          </p>

        </div>

        <div className="report-cards">

          <div className="report-card">

            <div className="report-icon">

              <FaUsers />

            </div>

            <div>

              <span>
                Total Employees
              </span>

              <h2>
                {employees.length}
              </h2>

            </div>

          </div>

          <div className="report-card">

            <div className="report-icon">

              <FaBuilding />

            </div>

            <div>

              <span>
                Departments
              </span>

              <h2>
                {departments}
              </h2>

            </div>

          </div>

          <div className="report-card">

            <div className="report-icon">

              <FaClipboardCheck />

            </div>

            <div>

              <span>
                Present Today
              </span>

              <h2>
                {present}
              </h2>

            </div>

          </div>

          <div className="report-card">

            <div className="report-icon">

              <FaMoneyCheckAlt />

            </div>

            <div>

              <span>
                Total Salary
              </span>

              <h2>
                ₱ {totalSalary.toLocaleString()}
              </h2>

            </div>

          </div>

        </div>

        <div className="report-section">

          <h2>
            Employee Overview
          </h2>

          <table className="report-table">

            <thead>

              <tr>

                <th>Employee</th>

                <th>Department</th>

                <th>Position</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>               {

                employees.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "25px"
                      }}
                    >
                      No employee records found.
                    </td>

                  </tr>

                ) : (

                  employees.map((emp) => (

                    <tr key={emp.id}>

                      <td>

                        {emp.firstName} {emp.lastName}

                      </td>

                      <td>

                        {emp.department}

                      </td>

                      <td>

                        {emp.position}

                      </td>

                      <td>

                        <span
                          className={`status-${String(emp.status || "")
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {emp.status}
                        </span>

                      </td>

                    </tr>

                  ))

                )

              }

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}

export default Reports;
            