import { useState } from "react";
import "./App.css"

const Header = ({ headerText }) => {
  return <h2>{headerText}</h2>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr className="stat-line">
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const StatisticTable = (props) => {
  return (
    <table>
      <tbody>
        {props.children}
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = () => {
    return good + neutral + bad;
  };

  const avg = () => {
    return (good*1 + bad*-1)/total();
  };

  const goodPercent = () => {
    return good/total()*100;
  };

  if (good < 1 && neutral < 1 && bad < 1) {
    return <div className="stat-line">No feedback given</div>
  };
  
  return (
    <StatisticTable>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total()} />
      <StatisticLine text="average" value={avg()} />
      <StatisticLine text="positive" value={`${goodPercent()} %`} />
    </StatisticTable>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header headerText="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Header headerText="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
