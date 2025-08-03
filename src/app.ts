import express from 'express';
import bodyParser from 'body-parser';
import ageGroupRoutes from './routes/ageGroupRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(bodyParser.json());

app.use('/api/age-groups', ageGroupRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);


export default app;
