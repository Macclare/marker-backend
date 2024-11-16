import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser"
import { db } from './config'
import cors from "cors";
import { URL } from './config'
import dotenv from 'dotenv';
import markerRoutes from "./routes/markerRoutes";
dotenv.config();

//Sequelize connection
db.sync({ alter: true }).then(() => {
    console.log('DB connected successfully')
}).catch((err: any) => {
    console.log(err)
})

export const port = process.env.PORT || 4000;
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());


//Router middleware
app.use('/api/markers', markerRoutes);

app.listen(port, () => {
    console.log(`Server running on ${URL}:${port}`)
})

export default app;


