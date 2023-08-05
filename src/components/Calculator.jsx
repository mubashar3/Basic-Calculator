
import React, { useState } from 'react';
import './Calculator.css';
import btns from "./buttons";

const Calculator = () => {

    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const onPressValues = (value) => {
        if (input.length === 0 && isOperator(value)) {
            return;
        }

        if (value === '0' && isOperator(input[input.length - 1])) {
            return;
        }

        if (isOperator(value) && isOperator(input[input.length - 1])) {
            deleteInput();
        }
        setInput((prevInput) => prevInput === '0' ? value : prevInput + value);
    };

    function isOperator(value) {
        if (value === '+' || value === '-' || value === '/' || value === '*' || value === '%') {
            return true;
        }
        return false;
    }

    function deleteInput() {
        if (input.length === 0) {
            return;
        }
        setInput(input.substring(0, input.length - 1));
    }

    const calculateValue = () => {
        if (isOperator(input[input.length - 1])) {
            return;
        }

        const res = eval(input).toString();
        setInput(res);
        // setResults([res, ...results]); // wrong way
        setResults((prev) => [res, ...prev]); // correct way
    };


    const clearInput = () => {
        setInput('');
    };

    return (
        <div className='main'>
            <div className="calculator border flex-col">
                <input className='border' type="text" value={input} placeholder='0' readOnly />
                <div className='buttons'>

                    <button onClick={clearInput}>AC</button>
                    <button onClick={deleteInput}>{"<"}</button>

                    {btns.map((btn, index) =>
                        <button key={index} className={btn.class} onClick={() => onPressValues(btn.value)}>{btn.name}</button>
                    )
                    }
                    <button onClick={calculateValue}>=</button>
                </div>
            </div>
            <div className='border history flex-col'>
                <h1>History</h1>

                <ul>
                    {results.map((res, index) => <li key={index}>{res}</li>)}
                </ul>
            </div>
        </div>

    );
};

export default Calculator;
