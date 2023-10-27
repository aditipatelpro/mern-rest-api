import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorMiddleware';
import connectDB  from './config/db';
import goalRoutes from './routes/goalRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();
const port = process.env.PORT || 8080;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'),
    );
  });
}

app.use(errorHandler);

app.listen(port, () => console.log('hello'));
