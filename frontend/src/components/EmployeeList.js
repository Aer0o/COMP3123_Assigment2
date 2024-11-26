import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "./api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to access this page.");
      navigate("/");
    }

    const loadEmployees = async () => {
      const response = await fetchEmployees();
      setEmployees(response.data);
    };
    loadEmployees();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp._id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Employees List</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <Link to="/add-employee" className="btn btn-primary mb-3">
        Add Employee
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={`/update-employee/${employee._id}`} className="btn btn-info">
                  Update
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
                <Link to={`/view-employee/${employee._id}`} className="btn btn-secondary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;