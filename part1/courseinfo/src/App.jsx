const Header = (props) => {
  return (
    <div>
      <h1>{props.coursename}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.number}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const total =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return (
    <>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total number={total} />
    </>
  );
};

export default App;
