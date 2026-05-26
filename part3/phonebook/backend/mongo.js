require("dotenv").config();
const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

//const password = process.argv[2];

const { DB_USERNAME, DB_PASSWORD } = process.env;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.qnb0r6n.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", peopleSchema);

if (process.argv.length === 4) {
  console.log("adding new person to the DB");

  const personName = process.argv[2];
  const personNumber = process.argv[3];

  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then((result) => {
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
