import express from 'express';
import bodyParser from 'body-parser';
import uploadRoutes from './src/routers/uploadRoutes'

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));

app.use('/upload', uploadRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});