const Person = require("./models/person");

/**
 * Fetches all persons from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of persons.
 */

const getAllPersons = async () => {
  return await Person.find({});
};

module.exports = { getAllPersons };
