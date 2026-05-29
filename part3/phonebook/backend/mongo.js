// command to run console based DB:
// node mongo.js - to get all the persons
// node mongo.js Name 123-123456 - to add a new person to the DB

const mongoose = require("mongoose");
const Person = require("./models/person");

if (process.argv.length === 4) {
  console.log("adding new person to the DB");

  const personName = process.argv[2];
  const personNumber = process.argv[3];

  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 2) {
  Person.find().then((result) => {
    console.log("printing all the people from the DB");
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
} else {
  console.log("wrong number of arguments");
  process.exit(1);
}
