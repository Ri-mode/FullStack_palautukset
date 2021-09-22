import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1,
    }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    let alreadyName = false
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alreadyName = true
        break
      }
    }
    if (alreadyName) {
      window.alert(newName + ' is already added to phonebook')
    } else {
      const numberObject = {
        name: newName,
        id: persons.length + 1,
      }
      setPersons(persons.concat(numberObject))
      console.log('Number added', event.target)
    }  
    setNewName('')
  }

  const handleNumberChange = (event) => {
    console.log('Tekstiä', event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <div key={person.id}>
            {person.name}
            <p></p>
          </div>  
        )}
      </div>

      {/*<div>debug: {newName}</div> */}
    </div>
  )

}

export default App