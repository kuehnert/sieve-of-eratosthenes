import { useEffect, useState } from 'react';
import Number from './Number';
import './App.css';

function App() {
  const [size, setSize] = useState(100);
  const [currentNumber, setCurrentNumber] = useState(2);
  const [numbers, setNumbers] = useState([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    reset();
  }, []);

  const changeSize = event => {
    setSize(parseInt(event.target.value));
  };

  const reset = () => {
    const nums = Array.from({ length: size }).fill(1);
    nums[0] = -1;
    nums[1] = -1;
    setNumbers(nums);
    setCurrentNumber(2);
  };

  const sieveNumber = () => {
    const newNumbers = JSON.parse(JSON.stringify(numbers));

    for (let j = currentNumber * 2; j < newNumbers.length; j += currentNumber) {
      newNumbers[j] = 0;
    }

    setNumbers(newNumbers);
    let newCurrent = currentNumber + 1;
    while (newNumbers[newCurrent] < 1) {
      newCurrent += 1;
    }
    setCurrentNumber(newCurrent);
  };

  const sieveAll = () => {
    const newNumbers = JSON.parse(JSON.stringify(numbers));
    const newCurrent = Math.floor(Math.sqrt(newNumbers.length));

    for (let i = 2; i < newCurrent; i += 1) {
      if (newNumbers[i]) {
        for (let j = i * 2; j < newNumbers.length; j += i) {
          newNumbers[j] = 0;
        }
      }
    }

    setNumbers(newNumbers);
    setCurrentNumber(newCurrent);
  };

  return (
    <div className='App'>
      <header className='App-header'>Sieve of Eratosthenes</header>

      <div className='buttons'>
        <input value={size} type='number' onChange={changeSize} />

        <button onClick={reset}>Reset</button>

        <input
          value={currentNumber}
          type='number'
          onChange={event => {
            setCurrentNumber(parseInt(event.target.value));
          }}
        />
        <button onClick={sieveNumber}>Sieve number</button>
        <button onClick={sieveAll}>Sieve all!</button>

        <input type='checkbox' value={hidden} onClick={event => setHidden(!hidden)} />
      </div>

      <div className='numbers'>
        {numbers.map((n, i) => {
          return <Number key={i} number={i} flipped={n} hidden={hidden} />;
        })}
      </div>
    </div>
  );
}

export default App;
