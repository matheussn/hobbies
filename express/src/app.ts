import express from 'express';
import { errorMiddleware } from './base/ErrorHandler';
import hobbieRoutes from './hobbie/routes';
import userRoutes from './user/routes';

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(userRoutes)
app.use(hobbieRoutes)
app.use(errorMiddleware);


app.listen(3000);