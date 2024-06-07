const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', reviewRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
