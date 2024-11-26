import express  from "express";
import { router } from './routes';
import cors from 'cors';
import { apiLimiter } from "./middleware/rateLimiter";
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from "./services/swagger";


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.use('/api/v1', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.listen(process.env.PORT);