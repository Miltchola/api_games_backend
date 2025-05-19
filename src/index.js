import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './database/configdb.js'
import UserRoute from './routes/user.route.js'
import ExampleRoute from './routes/example.route.js';
import TaskRouter from './routes/task.route.js';

dotenv.config();
db.connect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", UserRoute);
app.use("/secureExampleRoute", ExampleRoute);
app.use("/tasks", TaskRouter);

app.get('/', (req, res) => {
    res.send({message: 'Olá mundo'});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
