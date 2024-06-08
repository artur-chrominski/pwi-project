const { getProjects } = require('../models/projectModel');

const fetchProjects = async (req, res) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send('Error getting projects: ' + error.message);
  }
};

module.exports = { fetchProjects };
