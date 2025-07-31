import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./components/Persons"
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }  

  useEffect(hook, []);

  const isPersonAdded = () => persons.some((person) => person.name === newName);

  const getFilteredPersons = () => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(newFilterValue.toLowerCase());
    }); 
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    if (isPersonAdded()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
    };

    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={newFilterValue}
        setNewFilterValue={(event) => setNewFilterValue(event.target.value)} 
      />
      <h3>Add a new</h3>
        <PersonForm 
          addNewPerson={addNewPerson}
          newName={newName}
          setNewName={(event) => setNewName(event.target.value)}
          newNumber={newNumber}
          setNewNumber={(event) => setNewNumber(event.target.value)} 
        />
      <h3>Numbers</h3>
      <div>
        <Persons persons={getFilteredPersons()}/>
      </div>
    </div>
  )
}

export default App