import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

// get A controller
const getAController = (req: Request, res: Response) => {
  const message = 'Hello World!';
  res.send(message);
};

// trigger to the router to get A
app.get('/', getAController);

export default app;
