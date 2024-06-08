const express = require('express');
const { fetchProjects } = require('../controllers/projectController');
const router = express.Router();

router.get('/projects', fetchProjects);

module.exports = router;
