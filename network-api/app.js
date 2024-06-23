const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const stuffRoutes = require('./src/routes/stuff');
const userRoutes = require('./src/routes/user');
const profileRoutes = require('./src/routes/profile');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from 'upload/images'
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

mongoose.connect('mongodb://localhost:27017/network')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/prof', profileRoutes);

app.get('/api', (_, res) => {
  res.json({ message: 'welcome to network-api' });
});

module.exports = app;
