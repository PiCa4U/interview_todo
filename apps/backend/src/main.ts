import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the todos.' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;

    if(!title){
      res.status(400).json({ error: 'Title is required.' });
    }

    const newTodo = await prisma.todo.create({
      data: { title },
    });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the todo.' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if(!id || typeof completed !== 'boolean'){
      res.status(400).json({ error: 'Data is required.' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the todo.' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      res.status(400).json({ error: 'No id like that.' });
    }

    await prisma.todo.delete({
      where: { id },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the todo.' });
  }

});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
