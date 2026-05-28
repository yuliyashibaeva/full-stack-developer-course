require("dotenv").config();
const express = require("express");
const app = express();
let morgan = require("morgan");
const Person = require("./models/person");
const { getAllPersons } = require("./utils");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
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
  Person.find({}).then((persons) => {
    response.json(
      persons.sort(
        (person1, person2) => Number(person1.id) - Number(person2.id)
      )
    );
  });
});

app.get("/api/info", async (request, response) => {
  const allPersons = await getAllPersons();
  const personsCount = allPersons.length;
  const now = new Date();
  response.send(
    `<div><h1>Info</h1><p>Phonebook has info for ${personsCount} people</p><p>${now}</p></div>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result == null) {
        response.status(404).end();
      }

      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;
  const allPersons = await getAllPersons();

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

  if (allPersons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "person with this name has been already added",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", async (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
