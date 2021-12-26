const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

// middlwere
app.use(cors());
app.use(express.json());

// ROUTES

// craete a todo
app.post('/todos', async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO todos (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.detail });
  }
});
//get all todos
app.get('/todos', async (req, res) => {
  try {
    console.log(req.body);
    const { rows } = await pool.query('SELECT * FROM todos');
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(404).json({ err: err.detail });
  }
});
// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validId = await pool.query('SELECT * FROM todos WHERE todo_id=$1', [
      id,
    ]);
    if (validId.rows[0] != undefined) {
      const { rows } = await pool.query(
        'SELECT * FROM todos WHERE todo_id=$1',
        [id]
      );
      res.status(200).json({ success: true, data: rows[0] });
    } else {
      res.status(404).json({ err: `there are no todos wide that id :${id}` });
    }
  } catch (err) {
    res.status(404).json({ err: err.detail });
  }
});
// updte a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const validId = await pool.query('SELECT * FROM todos WHERE todo_id=$1', [
      id,
    ]);
    if (validId.rows[0] != undefined) {
      const { description } = req.body;
      const { rows } = await pool.query(
        'UPDATE todos SET description=$1 WHERE todo_id=$2',
        [description, id]
      );
      res.status(200).json({ success: true, massge: 'Todo was updated!' });
    } else {
      res.status(404).json({ err: `there are no todos wide that id :${id}` });
    }
  } catch (err) {
    res.status(404).json({ err: err.detail });
  }
});
// delet a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validId = await pool.query('SELECT * FROM todos WHERE todo_id=$1', [
      id,
    ]);
    if (validId.rows[0] != undefined) {
      const deleteTodo = await pool.query(
        'DELETE  FROM todos WHERE todo_id=$1',
        [id]
      );
      res.status(200).json({ success: true, massge: 'Todo was deleted!' });
    } else {
      res.status(404).json({ err: `there are no todos wide that id :${id}` });
    }
  } catch (err) {
    res.status(404).json({ err: err.detail });
  }
});
// connection to server
app.listen(5000, () => {
  console.log('sever run on  port 5000');
});
