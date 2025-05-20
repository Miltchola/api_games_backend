import express from "express";
import dotenv from "dotenv";
import db from "./database/configdb.js";
import userRoute from "./routes/user.route.js";
import exampleRoute from "./routes/example.route.js";
import taskRoutes from "./routes/task.route.js"; // Importado para mostrar no Banco do Mongo Express
import cors from 'cors';


import User from './models/User.js'; // Importado para mostrar no Banco do Mongo Express

dotenv.config();
db.connect();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Seu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(express.json());

app.use("/users", userRoute);

app.use("/secureExampleRoute", exampleRoute);

app.use('/tasks', taskRoutes); // rota protegida

app.get("/", (req, res) => {
    res.send({message: 'Hello World!'});
});

app.listen(PORT, () => {
    // Por algum motivo, usou acento '`' aqui
    console.log(`Server is running on port http://localhost:${PORT}/`);
    console.log("Hello World");
    console.log("Hello peeeopleee");
});
