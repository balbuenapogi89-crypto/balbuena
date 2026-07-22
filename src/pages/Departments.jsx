import { useEffect, useState } from "react";
import "./Departments.css";

import {
  FaBuilding,
  FaUsers,
  FaEye
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

function Departments() {

  const API =
    "http://localhost/novahr/server/api/employees.php";

  // ===========================
  // STATES
  // ===========================

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);

  // ===========================
  // LOAD DEPARTMENTS
  // ===========================

  useEffect(() => {

    fetchDepartments();

  }, []);

  const fetchDepartments = async () => {

    try {

      const response = await fetch(API);

      const employeeData = await response.json();

      const departmentList = {};

      employeeData.forEach((employee) => {

        const dept = employee.department;

        if (!dept) return;

        if (!departmentList[dept]) {

          departmentList[dept] = {

            id: dept,

            name: dept,

            employees: 0

          };

        }

        departmentList[dept].employees++;

      });

      setDepartments(
        Object.values(departmentList)
      );

    } catch (error) {

      console.error(error);

    }

  };

  // ===========================
  // VIEW DEPARTMENT
  // ===========================

  const viewDepartment = async (department) => {

    try {

      const response = await fetch(API);

      const employeeData = await response.json();

      const list = employeeData.filter(

        (employee) =>

          employee.department === department

      );

      setEmployees(list);

      setSelectedDepartment(department);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <div className="page-header">

          <div>

            <h1>
              Departments
            </h1>

            <p>
              View employees by department
            </p>

          </div>

        </div>

        {
          selectedDepartment ?
                    <div className="employee-list-container">

            <div className="list-header">

              <h2>

                {selectedDepartment} Employees

              </h2>

              <button
                onClick={() => setSelectedDepartment(null)}
              >
                Back
              </button>

            </div>

            <table className="department-table">

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Position</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {

                  employees.map((employee) => (

                    <tr key={employee.id}>

                      <td>

                        {employee.firstName} {employee.lastName}

                      </td>

                      <td>

                        {employee.position}

                      </td>

                      <td>

                        <span className="status">

                          {employee.status}

                        </span>

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

          :

          <div className="department-grid">

            {

              departments.map((dept) => (

                <div
                  className="department-card"
                  key={dept.id}
                >

                  <div className="department-icon">

                    <FaBuilding />

                  </div>

                  <h3>

                    {dept.name}

                  </h3>

                  <div className="employee-total">

                    <FaUsers />

                    {dept.employees} Employees

                  </div>

                  <button
                    className="view-btn"
                    onClick={() => viewDepartment(dept.name)}
                  >

                    <FaEye />

                    View All

                  </button>

                </div>

              ))

            }

          </div>

        }

      </main>

    </div>

  );

}

export default Departments;