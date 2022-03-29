import React from "react"

const Persons = ({ persons, filterName, deletePerson }) => {
  
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
        .map(person =>
          <div key={person.id}>
           {person.name} {person.number} <button onClick = {() => deletePerson(person.id)}>delete</button>
        </div>
        )
      }
    </div>
  )
}

export default Persons