import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

// get A controller
const getAController = (req: Request, res: Response) => {
  const message = 'Hello World!';
  res.send(message);
};

// trigger to the router to get A
app.get('/', getAController);
// global error handler
app.use(globalErrorHandler);
// not found route
app.use(notFound);
export default app;
