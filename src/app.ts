import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// get A controller
const testController = (req: Request, res: Response) => {
  const message = 'Hello World!';
  res.send(message);
};

// trigger to the router to get A
app.get('/', testController);
// global error handler
app.use(globalErrorHandler);
// not found route
app.use(notFound);
export default app;
