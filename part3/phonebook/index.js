const express = require("express");
const app = express();
let persons = require("./data");
let morgan = require("morgan");
const cors = require("cors");

const generatePersonId = (persons) => {
  let personId;

  do {
    personId = Math.floor(Math.random() * 100);
  } while (persons.some((person) => Number(person.id) === personId));

  return personId.toString();
};

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.get("/api/persons", (request, response) => {
  response.json(
    persons.sort((person1, person2) => Number(person1.id) - Number(person2.id))
  );
});

app.get("/api/info", (request, response) => {
  const personsCount = persons.length;
  const now = new Date();
  console.log(now);
  response.send(
    `<div><h1>Info</h1><p>Phonebook has info for ${personsCount} people</p><p>${now}</p></div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `There is no person with id = ${id}`;
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.statusMessage = `There is no person with id = ${id}`;
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "person with this name has been already added",
    });
  }

  const person = {
    id: generatePersonId(persons),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
