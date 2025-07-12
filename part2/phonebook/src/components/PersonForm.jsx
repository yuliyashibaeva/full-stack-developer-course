const PersonForm = ({ addNewPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: 
        <input 
          value={newName} 
          onChange={setNewName} 
        />
      </div>
      <div>
        number: 
        <input 
          value={newNumber}
          onChange={setNewNumber} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
};

export default PersonForm;