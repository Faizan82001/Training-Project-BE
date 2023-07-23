const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./config/swagger.json');
const cors = require('cors');
const multer = require('multer');

global.CONSTANTS = require('./utils/constants');
global.MESSAGES = require('./utils/messages.json');

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });

// Route configuration
const authRoutes = require('./routes/authRouter');
const billingManagerRoutes = require('./routes/billingManagerRoute');
const tripRequestsRoutes = require('./routes/tripRequestsRouter');
const billingAdminRoutes = require('./routes/billingAdminRoute');
const ocrRoutes = require('./routes/ocrRoute');
const issueRoutes = require('./routes/issueRoute');
const auditTrailRoutes = require('./routes/auditTrailRoute');

app.use(
    cors({
        origin: process.env.FRONT_ENDPOINT,
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH']
    })
);

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const storage = multer.memoryStorage();

app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(multer({ storage }).single('image'));

app.use('/api/auth', authRoutes);
app.use('/api/billing-manager', billingManagerRoutes);
app.use('/api/billing-admin', billingAdminRoutes);
app.use('/api/trip-requests', tripRequestsRoutes);
app.use('/api/report-issue', issueRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/audit-trail', auditTrailRoutes);


module.exports = app;
