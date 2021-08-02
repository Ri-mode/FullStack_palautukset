import React, { useState } from 'react'

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  if (sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{sum}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{(props.good - props.bad) / (sum)}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{(props.good / (sum) * 100) + " %"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App