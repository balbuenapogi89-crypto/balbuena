import "./StatsCards.css";

import {
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaMoneyBillWave
} from "react-icons/fa";

function StatsCards({
  employees = [],
  attendance = [],
  payroll = []
}) {

  const totalEmployees = employees.length;

  const presentToday = attendance.filter(
    (emp) => emp.status === "Present"
  ).length;

  const totalDepartments = new Set(
    employees.map((emp) => emp.department)
  ).size;

  const totalPayroll = payroll.reduce(
    (total, emp) =>
      total + Number(emp.salary || emp.amount || 0),
    0
  );

  const cards = [

    {
      title: "Employees",
      value: totalEmployees,
      icon: <FaUsers />,
      color: "#6D28D9"
    },

    {
      title: "Present Today",
      value: presentToday,
      icon: <FaUserCheck />,
      color: "#16A34A"
    },

    {
      title: "Departments",
      value: totalDepartments,
      icon: <FaBuilding />,
      color: "#F59E0B"
    },

    {
      title: "Payroll",
      value: `₱${totalPayroll.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
      color: "#DC2626"
    }

  ];

  return (

    <div className="stats-grid">

      {cards.map((card, index) => (

        <div
          className="stats-card"
          key={index}
        >

          <div
            className="stats-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>

            <span>{card.title}</span>

            <h2>{card.value}</h2>

          </div>

        </div>

      ))}

    </div>

  );

}

export default StatsCards;