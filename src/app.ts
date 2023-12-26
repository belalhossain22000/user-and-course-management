
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

//root route for check status
app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

// Use the error handler as the last middleware
app.use(globalErrorHandler);

//not found handler
app.use(notFound);

export default app;
