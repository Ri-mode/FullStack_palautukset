import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notification from "./components/Notification"
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('Vaihda numero', newName)
        const changeNumber = persons.find(person => person.name === newName)
        const numberChanged = { ...changeNumber, number: newNumber }

        personService
          .update(numberChanged.id, numberChanged)
          .then(() => personService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
          )
          .then(() => {
            setErrorMessage(`Updated ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2500)
          })
      }
      //window.alert(`${newName} is already added to phonebook`)
    } else {
      const numberObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(numberObject)
        .then(returnedNumber => {
          console.log('returned', returnedNumber)
          setPersons(persons.concat(returnedNumber))
        })
        .then(() => {
          setErrorMessage(`Added ${newName}`          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2500)
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
        .then(() => {
          setErrorMessage(`Removed ${personToDelete.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2500)
        })
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
      <Notification message={errorMessage} />
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