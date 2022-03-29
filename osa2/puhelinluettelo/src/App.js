import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

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
      personService
        .create(numberObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
        })
      
      console.log('Number added', event.target)
    }  
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    console.log('toDelete', personToDelete.id)

    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete.id)
        .then(() => setPersons(persons.filter(person => person.id !== personToDelete.id)))
    }
  }

  const handleNameChange = (event) => {
    console.log('Nimi', event.target.value)
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

      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson} />
      
      {/*<div>debug: {newName}</div> */}
    </div>
  )

}

export default App