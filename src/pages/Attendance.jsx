import { useEffect, useState } from "react";

import "./Attendance.css";

import Sidebar from "../components/Sidebar";

import {
  getAttendance,
  saveAttendance
} from "../utils/attendanceStorage";

function Attendance() {

  const API =
    "http://localhost/novahr/server/api/employees.php";

  // ===========================
  // STATES
  // ===========================

  const [employees, setEmployees] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const [employee, setEmployee] = useState("");

  const [status, setStatus] = useState("Present");

  // ===========================
  // LOAD EMPLOYEES + ATTENDANCE
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
  // MARK ATTENDANCE
  // ===========================

  const markAttendance = () => {

    if (!employee) {

      alert("Please select an employee.");

      return;

    }

    const selected = employees.find(

      (emp) => String(emp.id) === String(employee)

    );

    if (!selected) {

      alert("Employee not found.");

      return;

    }

    const record = {

      id: Date.now(),

      employeeId: selected.id,

      name: `${selected.firstName} ${selected.lastName}`,

      department: selected.department,

      status: status,

      date: new Date().toLocaleDateString()

    };

    const updated = [

      ...attendance,

      record

    ];

    setAttendance(updated);

    saveAttendance(updated);

    setEmployee("");

    setStatus("Present");

  };

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <div className="page-header">

          <h1>
            Attendance
          </h1>

          <p>
            Monitor employee attendance records.
          </p>

        </div>

        <div className="attendance-form">

          <select

            value={employee}

            onChange={(e) => setEmployee(e.target.value)}

          >

            <option value="">
              Select Employee
            </option>

            {
              employees.map((emp) => (

                <option
                  key={emp.id}
                  value={emp.id}
                >
                  {emp.firstName} {emp.lastName}
                </option>

              ))
            }

          </select>

          <select

            value={status}

            onChange={(e) => setStatus(e.target.value)}

          >

            <option>Present</option>

            <option>Late</option>

            <option>Absent</option>
                      </select>

          <button
            onClick={markAttendance}
          >
            Mark Attendance
          </button>

        </div>

        <table className="attendance-table">

          <thead>

            <tr>

              <th>Employee</th>

              <th>Department</th>

              <th>Status</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {

              attendance.length > 0 ? (

                attendance.map((item) => (

                  <tr key={item.id}>

                    <td>

                      {item.name}

                    </td>

                    <td>

                      {item.department}

                    </td>

                    <td>

                      <span
                        className={`attendance-${item.status.toLowerCase()}`}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td>

                      {item.date}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No attendance records found.
                  </td>

                </tr>

              )

            }

          </tbody>

        </table>

      </main>

    </div>

  );

}

export default Attendance;
