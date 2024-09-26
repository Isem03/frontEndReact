import React, { useState } from 'react';
import './calculadora.css'
function Calculadora() {
  const [resultado, setResultado] = useState('');

  const handleClick = (valor) => {
    setResultado(resultado + valor);
  };

  const handleClear = () => {
    setResultado('');
  };

  const handleCalculate = () => {
    try {
      const resultadoCalculo = eval(resultado);
      setResultado(resultadoCalculo);
    } catch (error) {
      setResultado('Error');
    }
  };

  return (
    
    <div className="calculadora">
      <input type="text" value={resultado} readOnly placeholder='IsaDev'/>
      <div className="botones">
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}

export default Calculadora;