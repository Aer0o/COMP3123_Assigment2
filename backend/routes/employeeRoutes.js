const express = require('express');
const {
  getEmployees,
  createEmployee,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} = require('../controllers/employeeController');
const router = express.Router();

router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.get('/search', searchEmployees);
router.put('/employees/:id', updateEmployee); 
router.delete('/employees/:id', deleteEmployee);
router.get('/employees/:id', getEmployeeById)




module.exports = router;