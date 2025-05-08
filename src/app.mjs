import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.mjs';

const app = express();
const allowedOrigin = 'https://url-shortener-tau-roan.vercel.app/';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use('/api', urlRoutes);

export default app;
