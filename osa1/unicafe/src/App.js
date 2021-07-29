import React, { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
    <p>All {props.good + props.neutral + props.bad}</p>
    <p>Average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</p>
    <p>Positive {props.good / (props.good + props.neutral + props.bad) * 100} %</p>
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

      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {good + neutral + bad}</p>
      <p>Average {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive {good / (good + neutral + bad) * 100} %</p>

    </div>
  )
}

export default App