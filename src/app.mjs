import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.mjs';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', urlRoutes);

export default app;
