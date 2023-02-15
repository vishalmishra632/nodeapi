const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const adminUsersRoutes = require('./routes/adminUsersRoutes');
const commonMessages = require('./utils/commonMessages');
const httpStatus = require('./utils/httpStatus');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connection
    .once('open', () => console.log('Database connected'))
    .on('error', (error) => console.log('Error connecting to database: ', error));

app.use('/api/auth', authRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/adminUsers', adminUsersRoutes);

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.httpStatusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || commonMessages.INTERNAL_SERVER_ERROR,
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
