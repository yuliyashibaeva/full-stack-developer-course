const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.data[0].part} exercise={props.data[0].exercise} />
      <Part part={props.data[1].part} exercise={props.data[1].exercise} />
      <Part part={props.data[2].part} exercise={props.data[2].exercise} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.number}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    { part: 'Fundamentals of React', exercise: 10 },
    { part: 'Using props to pass data', exercise: 7 },
    { part: 'State of a component', exercise: 14 }
  ]
  const total = content[0].exercise + content[1].exercise + content[2].exercise

  return (
    <>
      <Header course={course} />
      <Content data={content}/>
      <Total number={total} />
    </>
  )
}

export default App