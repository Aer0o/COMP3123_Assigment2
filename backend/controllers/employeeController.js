const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const employeeData = req.body;
  try {
    const newEmployee = new Employee(employeeData);
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  const { eid } = req.params;
  try {
    const employee = await Employee.findById(eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { eid } = req.params;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { eid } = req.query;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(eid);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(204).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};