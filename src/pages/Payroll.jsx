import { useEffect, useState } from "react";
import "./Payroll.css";

import Sidebar from "../components/Sidebar";

import {
  FaMoneyCheckAlt,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";

function Payroll() {

  const API =
    "http://localhost/novahr/server/api/employees.php";

  const [employees, setEmployees] = useState([]);
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {

    loadPayroll();

  }, []);

  // ===========================
  // LOAD PAYROLL
  // ===========================

  const loadPayroll = async () => {

    try {

      const response = await fetch(API);

      const employeeData = await response.json();

      setEmployees(employeeData);

      const savedPayroll =
        JSON.parse(
          localStorage.getItem("payroll")
        ) || [];

      const updatedPayroll =
        employeeData.map((employee) => {

          const existing =
            savedPayroll.find(

              (item) =>

                String(item.id) ===
                String(employee.id)

            );

          if (existing) {

            return {

              ...existing,

              name:
                `${employee.firstName} ${employee.lastName}`,

              department:
                employee.department,

              position:
                employee.position,

              salary:
                Number(employee.salary) || 0

            };

          }

          return {

            id: employee.id,

            name:
              `${employee.firstName} ${employee.lastName}`,

            department:
              employee.department,

            position:
              employee.position,

            salary:
              Number(employee.salary) || 0,

            status: "Pending"

          };

        });

      setPayroll(updatedPayroll);

      localStorage.setItem(

        "payroll",

        JSON.stringify(updatedPayroll)

      );

    } catch (error) {

      console.error(error);

    }

  };

  // ===========================
  // CHANGE STATUS
  // ===========================

  const handleStatusChange = (

    id,

    status

  ) => {

    const updatedPayroll = payroll.map(

      (item) =>

        item.id === id

          ? {

              ...item,

              status

            }

          : item

    );

    setPayroll(updatedPayroll);

    localStorage.setItem(

      "payroll",

      JSON.stringify(updatedPayroll)

    );

  };

  // ===========================
  // SUMMARY
  // ===========================

  const totalPayroll = payroll.reduce(

    (total, item) =>

      total + Number(item.salary),

    0

  );

  const paid = payroll.filter(

    (item) =>

      item.status === "Paid"

  ).length;

  const pending = payroll.filter(

    (item) =>

      item.status === "Pending"

  ).length;

  const cancelled = payroll.filter(

    (item) =>

      item.status === "Cancelled"

  ).length;

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <div className="page-header">

          <h1>Payroll</h1>

          <p>

            Manage employee salary records.

          </p>

        </div>

        <div className="payroll-summary">

          <div className="payroll-card">

            <FaMoneyCheckAlt />

            <div>

              <span>Total Payroll</span>

              <h2>

                ₱ {totalPayroll.toLocaleString()}

              </h2>

            </div>

          </div>

          <div className="payroll-card">

            <FaUsers />

            <div>

              <span>Employees</span>

              <h2>{employees.length}</h2>

            </div>

          </div>

          <div className="payroll-card">

            <FaCheckCircle />

            <div>

              <span>Paid</span>

              <h2>{paid}</h2>

            </div>

          </div>

          <div className="payroll-card">

            <FaClock />

            <div>

              <span>Pending</span>

              <h2>{pending}</h2>

            </div>

          </div>

          <div className="payroll-card">

            <FaTimesCircle />

            <div>

              <span>Cancelled</span>

              <h2>{cancelled}</h2>

            </div>

          </div>

        </div>
                <table className="payroll-table">

          <thead>

            <tr>

              <th>Employee</th>

              <th>Department</th>

              <th>Position</th>

              <th>Salary</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {

              payroll.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "30px"
                    }}
                  >
                    No payroll records found.
                  </td>

                </tr>

              ) : (

                payroll.map((item) => (

                  <tr key={item.id}>

                    <td>

                      {item.name}

                    </td>

                    <td>

                      {item.department}

                    </td>

                    <td>

                      {item.position}

                    </td>

                    <td>

                      ₱ {Number(item.salary).toLocaleString()}

                    </td>

                    <td>

                      <select

                        value={item.status}

                        onChange={(e) =>
                          handleStatusChange(
                            item.id,
                            e.target.value
                          )
                        }

                        className={`status-select ${item.status.toLowerCase()}`}

                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Paid">
                          Paid
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </main>

    </div>

  );

}

export default Payroll;