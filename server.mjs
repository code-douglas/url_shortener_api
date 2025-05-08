import dotenv from 'dotenv';
import connectDB from './src/config/db.mjs';
import app from './src/app.mjs';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
