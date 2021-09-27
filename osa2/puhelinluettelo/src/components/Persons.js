import React from "react"

const Persons = ({ persons, filterName }) => {
  return (
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
  )
}

export default Persons