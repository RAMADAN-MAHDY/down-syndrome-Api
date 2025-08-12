import express from 'express';
import bodyParser from 'body-parser';
import ageGroupRoutes from './routes/ageGroupRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import contentRoutes from './routes/contentRouter.js';
import createContactUs from './routes/contactUs.js'
import connectDb from './config/connectDB.js';


import adminRoutes from './routes/admin/aontentRoutes.js';
import  AddArticle  from './routes/admin/articleRouter.js';
import cors from 'cors';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
mongoose.set('autoIndex', true);



app.use('/api', ageGroupRoutes); // جلب عمر الطفل
app.use('/api', articleRoutes); // جلب المقالات
app.use('/api', createContactUs); // انشاء نموذج الاتصال بنا
app.use('/api/events', eventRoutes); 
app.use('/api', contentRoutes); // جلب المحتوى
app.use('/api/admin', adminRoutes); // انشاء وتحديث وحذف المحتوى
app.use('/api/admin', AddArticle); // انشاء وتحديث وحذف المقالات

app.get('/', (req, res) => {
    res.send('Welcome to the Down Syndrome API');   
});

export default app;
