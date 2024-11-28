import express from 'express';
import userRoutes from './routes/user';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from './dbconnect';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: [`http://localhost:3000`, `${process.env.BE_HOST}:3001`]
 }));

app.get('/', (req, res) => {
   res.send('auth service.')
})

app.use('/api',userRoutes);

dbConnection()
app.listen(8888,()=>{
  console.log('server started on http://localhost:8888');
  
})