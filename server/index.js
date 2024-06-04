require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use('/api', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
