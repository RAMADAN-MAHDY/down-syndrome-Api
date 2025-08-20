import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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
import Events from './admin/routes/Events.js'
import content from './admin/routes/aontentRoutes.js';
import  Article  from './admin/routes/articleRouter.js';
import createadmin from './admin/routes/createAdmin.js'
import logInAdmin from './admin/routes/loginAdmin.js'
//--------------------------------------------------------------------

dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
  credentials: true
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
app.use('/api/admin', content); // انشاء وتحديث وحذف المحتوى
app.use('/api/admin', Article); // انشاء وتحديث وحذف المقالات
app.use('/api/admin', Events); // ااضافة حدث جديد
app.use('/api/admin', gitContactUS); // جلب بيانات التواصل
app.use('/api/admin' , createadmin); //انشاء ادمن
app.use('/api/admin' , logInAdmin); //تسجيل دخول الادمن


app.get('/', (req, res) => {
    res.send('Welcome to the Down Syndrome API');   
});

export default app;
