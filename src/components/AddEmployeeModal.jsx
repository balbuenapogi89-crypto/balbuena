import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./AddEmployeeModal.css";

function AddEmployeeModal({ onClose, onSave }) {

  const [employee, setEmployee] = useState({

    id: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    department: "Human Resources",
    position: "",
    email: "",
    phone: "",
    salary: "",
    status: "Active"

  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      employee.id.trim() === "" ||
      employee.firstName.trim() === "" ||
      employee.lastName.trim() === "" ||
      employee.position.trim() === ""
    ) {

      alert("Please complete all required fields.");
      return;

    }

    onSave(employee);

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>Add New Employee</h2>

          <button
            type="button"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="modal-body">

            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="id"
                value={employee.id}
                onChange={handleChange}
                placeholder="Enter Employee ID"
              />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
              >
                <option>Human Resources</option>
                <option>Information Technology</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>

            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </div>

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Employee
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddEmployeeModal;