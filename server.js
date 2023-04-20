const express = require('express');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/user.routes');
const roomRoutes = require('./routes/room.routes');
const typeRoutes = require('./routes/type.routes');
const detailRoutes = require('./routes/detail.routes');
const orderRoutes = require('./routes/order.routes');

const port = process.env.PORT || 4000;

// enabling cross origin resource sharing
app.use(cors());
// encoding user input
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes for user API
app.use('/api/user', userRoutes);

// routes for room API
app.use('/api/room', roomRoutes);

// routes for room types API
app.use('/api/types', typeRoutes);

// routes for detail API
app.use('/api/details', detailRoutes);

// routes for orders API
app.use('/api/order', orderRoutes);

// Server instance
app.listen(port, () => console.log(`App listening on port ${port}!`));
