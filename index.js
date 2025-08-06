import express from 'express';

const PORT = 3001;

const phonebook = [
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

const app = express();

app.get('/api/persons', (req, resp) => {
  return resp.json(phonebook);
});

app.get('/api/info', (req, resp) => {
  const bodyResp = `
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${(new Date())}</p>
  `

  return resp.send(bodyResp);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
