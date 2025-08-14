import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// mongoDb connect
import connectDb from './config/connectDB.js';
//------------------------------------------------------------------
import ageGroupRoutes from './routes/ageGroupRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import contentRoutes from './routes/contentRouter.js';
import createContactUs from './routes/contactUs.js'
//-------------------------------------------------------------------
// import from admin  
import gitContactUS from './admin/routes/contactUs.js'
import AddEvents from './admin/routes/Events.js'
import adminRoutes from './admin/routes/aontentRoutes.js';
import  AddArticle  from './admin/routes/articleRouter.js';
//--------------------------------------------------------------------

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
// customer Routers
app.use('/api', ageGroupRoutes); // جلب عمر الطفل
app.use('/api', articleRoutes); // جلب المقالات
app.use('/api', createContactUs); // انشاء نموذج الاتصال بنا
app.use('/api', eventRoutes); 
app.use('/api', contentRoutes); // جلب المحتوى

// admin Routers
app.use('/api/admin', adminRoutes); // انشاء وتحديث وحذف المحتوى
app.use('/api/admin', AddArticle); // انشاء وتحديث وحذف المقالات
app.use('/api/admin', AddEvents); // ااضافة حدث جديد
app.use('/api/admin', gitContactUS); // جلب بيانات التواصل

app.get('/', (req, res) => {
    res.send('Welcome to the Down Syndrome API');   
});

export default app;
