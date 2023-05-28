import { NumericFormat } from 'react-number-format';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [prevState, setPrevState] = useState('');
  const [curState, setCurState] = useState('');
  const [operator, setOperator] = useState(null);
  const [input, setInput] = useState('0');
  const [result, setResult] = useState(false);


  const reset = () => {
    setPrevState('');
    setCurState('');
    setInput('0');
  };

  const percent = () =>{
    if (prevState) {
      setCurState(String(parseFloat(curState) / 100 * prevState));
    } else {
      setCurState(String(parseFloat(curState) / 100));
    }
  }

  const minusPlus = () =>{
    if(curState.charAt(0) === '-'){
      setCurState(curState.substring(1))
    }
    else{
      setCurState('-' + curState);
    }
  }

  const number = (e) =>{
    if(curState.includes('.') && e.target.innerText === '.')
    return;

    if(result){
      setPrevState('');
    }
    setCurState((prev) => prev + e.target.innerText);
    setResult(false);
  }

  useEffect(() => {
    setInput(curState)
  }, 
  [curState]);

  useEffect(() => {
    setInput('0')
  }, 
  []);

  const operatorType = (e) =>{
    setResult(false)
    setOperator(e.target.innerText);

    if(curState === ''){
    return;
  }
  if (prevState !== ''){
    equals();
    }
    else{
      setPrevState(curState)
      setCurState('');
    }
  };

  const equals = (e) =>{
    if (e?.target.innerText === '='){
      setResult(true);
  }

  let cal
  switch (operator) {
    case '/':
      cal = String(parseFloat(prevState) / parseFloat(curState)
      );  
      break;

    case '+':
      cal = String(parseFloat(prevState) + parseFloat(curState)
      );  
      break;

    case 'x':
      cal = String(parseFloat(prevState) * parseFloat(curState)
      );  
      break;

    case '-':
      cal = String(parseFloat(prevState) - parseFloat(curState)
      );  
      break;

    default:
      return;
  }

  setInput('')
  setPrevState(cal)
  setCurState('')
};

return (
    <div className="App">
      <div className="wrapper">
        <div className="display">
          {input !== '' || input === '0' ? (
          <NumericFormat value={input}
            displayType={'text'}
            thousandSeparator={true} /> )
          
            : (<NumericFormat value={prevState}
              displayType='text' 
              thousandSeparator={true} />)}  
        </div>

        <div className='btn light' onClick={reset}>AC</div>
        <div className='btn light' onClick={percent}>%</div>
        <div className='btn light' onClick={minusPlus}>+/-</div>
        <div className='btn purple' onClick={operatorType}>/</div>
        <div className='btn' onClick={number}>7</div>
        <div className='btn' onClick={number}>8</div>
        <div className='btn' onClick={number}>9</div>
        <div className='btn purple' onClick={operatorType}>x</div>
        <div className='btn' onClick={number}>4</div>
        <div className='btn' onClick={number}>5</div>
        <div className='btn' onClick={number}>6</div>
        <div className='btn purple' onClick={operatorType}>+</div>
        <div className='btn' onClick={number}>1</div>
        <div className='btn' onClick={number}>2</div>
        <div className='btn' onClick={number}>3</div>
        <div className='btn purple' onClick={operatorType}>-</div>
        <div className='btn zero' onClick={number}>0</div>
        <div className='btn' onClick={number}>.</div>
        <div className='btn' onClick={equals}>=</div>

      </div>
      
    </div>
  );
}

export default App;
