import Header from "./Header";

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        total of{" "}
        {parts.reduce((totalNum, part) => totalNum + part.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

const Courses = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header content={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

export default Courses;