import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244',
      id: 1,
    },
    { name: 'Ada Lovelace',
      number: '39-44-5323523',
      id: 2 
    },
    { name: 'Dan Abramov',
      number: '12-43-234345',
      id: 3 
    },
    { name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 4 
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

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
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const numberObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(numberObject))
      console.log('Number added', event.target)
    }  
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log('Tekstiä', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Numero', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('Filter', event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
          value={filterName}
          onChange={handleFilterChange}
        />
      </div>
      
      <h2>Add a new number</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>  
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter(person => person.name.toLowerCase().includes(filterName))
          .map(person =>
            <div key={person.id}>
              {person.name} {person.number}
            </div>  
          )
        }
      </div>

      {/*<div>debug: {newName}</div> */}
    </div>
  )

}

export default App