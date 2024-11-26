import React, { useState } from "react";
import { searchEmployees } from "./api";

const SearchEmployees = () => {
  const [searchParams, setSearchParams] = useState({
    department: "",
    position: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchEmployees(searchParams);
      setResults(response.data);
    } catch (error) {
      alert("Error searching employees.");
    }
  };

  return (
    <div>
      <h2>Search Employees</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={searchParams.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={searchParams.position}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <h3>Results:</h3>
      <ul>
        {results.map((employee) => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name} ({employee.position})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchEmployees;