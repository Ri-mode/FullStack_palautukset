import React, { useState } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"


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
      <Filter 
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />
      
      <h3>Add a new number</h3>
      <PersonForm
        addNumber={addNumber} 
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />
      
      <h3>Numbers</h3>

      <Persons persons={persons} filterName={filterName}/>
      
      {/*<div>debug: {newName}</div> */}
    </div>
  )

}

export default App