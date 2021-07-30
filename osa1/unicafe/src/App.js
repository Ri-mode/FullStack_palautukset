import React, { useState } from 'react'

const StatisticLine = (props) => {

  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

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
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine text="All" value={sum} />
      <StatisticLine text="Average" value={(props.good - props.bad) / (sum)} />
      <StatisticLine text="Positive" value={(props.good / (sum) * 100) + " %"} />
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