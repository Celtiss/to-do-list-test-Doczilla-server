import express from 'express';
import fetch from "node-fetch";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Зпрос на целевой сервер
app.get('/todos', async (req, res) => {
  try {
    const api = await fetch(`https://todo.doczilla.pro/api/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (api.ok) {
      const data = await api.json();
      res.json(data);
    } else {
      throw new Error(`Ошибка: ${api.status}`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
