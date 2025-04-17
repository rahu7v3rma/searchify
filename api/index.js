require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cors')({ origin: process.env.CORS_ORIGIN }));

app.use('/gkt', require('./routers/gkt'));

app.get('/connect', async (req, res) => {
  res.send({
    success: true,
    message: 'API connected',
    data: null,
  });
});

require('mongoose')
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.listen(process.env.PORT, () => {
  console.log(`Express server is running on port ${process.env.PORT}`);
});
