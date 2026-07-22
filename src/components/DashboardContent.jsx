import { useEffect, useState } from "react";
import "./DashboardContent.css";

function DashboardContent() {

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const loadData = () => {

    const employeeData =
      JSON.parse(localStorage.getItem("employees")) || [];

    const attendanceData =
      JSON.parse(localStorage.getItem("attendance")) || [];

    // Latest 5 employees
    setEmployees(employeeData.slice(-5).reverse());

    // Latest 5 attendance
    setAttendance(attendanceData.slice(-5).reverse());

  };

  useEffect(() => {

    loadData();

    const interval = setInterval(loadData, 500);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="dashboard-content-grid">

      {/* LEFT SIDE */}

      <div>

        {/* RECENT EMPLOYEES */}

        <div className="dashboard-card">

          <div className="card-title">

            <h2>Recent Employees</h2>

          </div>

          {

            employees.length === 0 ?

            (

              <div className="empty-state">

                No employee records found.

              </div>

            )

            :

            (

              employees.map((emp,index)=>(

                <div
                  className="employee-item"
                  key={index}
                >

                  <div className="avatar">

                    {

                      `${emp.firstName || ""}`

                      .charAt(0)

                      .toUpperCase()

                    }

                  </div>

                  <div className="employee-info">

                    <h4>

                      {emp.firstName} {emp.lastName}

                    </h4>

                    <span>

                      {emp.department}

                    </span>

                  </div>

                  <span className="status">

                    {emp.status}

                  </span>

                </div>

              ))

            )

          }

        </div>





        {/* RECENT ATTENDANCE */}

        <div className="dashboard-card attendance-card">

          <div className="card-title">

            <h2>Recent Attendance</h2>

          </div>

          {

            attendance.length === 0 ?

            (

              <div className="empty-state">

                No attendance records found.

              </div>

            )

            :

            (

              attendance.map((item,index)=>(

                <div
                  className="attendance-item"
                  key={index}
                >

                  <div>

                    <h4>

                      {item.name}

                    </h4>

                    <span>

                      {item.time || "--"}

                    </span>

                  </div>

                  <strong>

                    {item.status}

                  </strong>

                </div>

              ))

            )

          }

        </div>

      </div>





      {/* RIGHT SIDE */}

      <div>

        <div className="dashboard-card">

          <h2>Announcements</h2>

          <ul className="announcement-list">

            <li>📢 Welcome to NovaHR Employee Management System</li>

            <li>📋 Keep employee records updated.</li>

            <li>🕒 Review attendance daily.</li>

            <li>💰 Verify payroll before releasing salaries.</li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default DashboardContent;