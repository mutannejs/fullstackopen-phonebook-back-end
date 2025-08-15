import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { Person } from './models/person.js';

const PORT = process.env.PORT || 3001;
const MAX_RANDOM_NUMBER = 999999;

// const persons = [
//   { 
//     "id": 1,
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": 2,
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": 3,
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": 4,
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]

morgan.token('body', function getBody (req, res) {
  return JSON.stringify(req.body)
});

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, resp, next) => {
  Person.find({})
    .then(response => resp.json(response))
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (!person) {
    return resp.status(404).end();
  } else {
    return resp.json(person);
  }
});

app.get('/api/info', (req, resp) => {
  const bodyResp = `
    <p>persons has info for ${persons.length} people</p>
    <p>${(new Date())}</p>
  `;

  return resp.send(bodyResp);
});

app.post('/api/persons', (req, resp, next) => {
  const person = req.body;

  if (!person.name) {
    return resp.status(400).json({
      error: "name is required"
    });
  }

  if (!person.number) {
    return resp.status(400).json({
      error: "number is required"
    });
  }

  const newId = Math.ceil(Math.random() * MAX_RANDOM_NUMBER);
  const newPerson = new Person({
    id: newId,
    ...person,
  });

  newPerson.save()
    .then(response => resp.json(response))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then(() => resp.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  const updatedPerson = {
    name: name,
    number: number,
  };

  Person.findByIdAndUpdate(
      id,
      updatedPerson,
      { new: true })
    .then((response) => resp.json(response))
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
