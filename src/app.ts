import express from 'express';
import bodyParser from 'body-parser';
import ageGroupRoutes from './routes/ageGroupRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import connectDb from './config/connectDB.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


connectDb();




app.use('/api', ageGroupRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Down Syndrome API');   
});

export default app;
