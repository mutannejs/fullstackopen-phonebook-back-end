import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const PORT = process.env.PORT || 3001;
const MAX_RANDOM_NUMBER = 999999;

const persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

morgan.token('body', function getBody (req, res) {
  return JSON.stringify(req.body)
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, resp) => {
  return resp.json(persons);
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

app.post('/api/persons', (req, resp) => {
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

  if (persons.some((p) => p.name === person.name)) {
    return resp.status(400).json({
      error: "name must be unique"
    });
  }

  const newId = Math.ceil(Math.random() * MAX_RANDOM_NUMBER);
  const newPerson = {
    id: newId,
    ...person,
  };

  persons.push(newPerson);

  return resp.json(newPerson);
});

app.delete('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id);
  const personToRemoveIndex = persons.findIndex(person => person.id === id);
  persons.splice(personToRemoveIndex, 1);

  return resp.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
