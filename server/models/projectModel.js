const { db } = require('../config/firebaseConfig');

const getProjects = async () => {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    return projectsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw new Error('Error getting projects: ' + error.message);
  }
};

module.exports = { getProjects };
