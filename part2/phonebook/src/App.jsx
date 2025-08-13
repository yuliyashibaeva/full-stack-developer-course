import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsServer from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')

  const hook = () => {
    personsServer
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }  

  useEffect(hook, []);

  const isPersonAdded = () => 
    persons.some((person) =>
      person.name.toLowerCase() === newName.toLowerCase());

  const getFilteredPersons = () => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(newFilterValue.toLowerCase());
    }); 
  };

  const updatePerson = (newPerson) => {
    const currentPerson = persons.find(item => item.name === newName);
    
    personsServer
      .updatePerson(currentPerson.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(item => item.id === currentPerson.id ? returnedPerson : item))
      })
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (isPersonAdded()) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(newPerson);
      }
    } else {
      personsServer
        .addNewPesron(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    };

    setNewName('');
    setNewNumber('');
  }

  const deletePersonFromPhonebook = person => {
    if (confirm(`Do you want to delete ${person.name} ?`)) {
      personsServer
        .deletePerson(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(item => item.id !== returnedPerson.id))
        })
    }
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
        <Persons 
          persons={getFilteredPersons()}
          deletePerson={deletePersonFromPhonebook} 
        />
      </div>
    </div>
  )
}

export default App