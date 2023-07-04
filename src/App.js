import { useState } from "react";
import { CSVLink } from "react-csv";

function App() {
  const [hasDot, setHasDot] = useState(false);
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState(0);
  const [opr, setOpr] = useState("");
  const [start, setStart] = useState(false);
  const [memory, setMemory] = useState(0);
  const [buttonClicks, setButtonClicks] = useState([]);
  const [temp, setTemp] = useState([]);

  const ops = ["/", "*", "+", "-"];

  const updateCalc = (value) => {
    handleClick(value);
    if (opr === "=") {
      setCalc(value);
      setOpr("");
      return;
    }
    if (value === "0" && calc === "") {
      setCalc("0");
      return;
    }
    if (value === "0" && calc === "0") {
      setCalc("0");
      return;
    }
    if (value === "." && calc === "0") {
      if (!hasDot) {
        setHasDot(true);
        setCalc(calc + value);
        return;
      } else {
        return;
      }
    }
    if (calc === "0") {
      setCalc(value);
      return;
    }
    if (value === ".") {
      if (!hasDot) {
        setHasDot(true);
      } else {
        return;
      }
    }
    if (ops.includes(value) && result === 0) {
      return;
    }
    setCalc(calc + value);
  };

  const add = () => {
    handleClick("+");
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      // setOpr("+");
      setHasDot(false);
      if (calc === "") {
        setTemp([...temp, "+"]);
        return;
      }
      const updatedTemp = [...temp];
      if (updatedTemp.length === 0) {
        setTemp([...temp, calc, "+"]);
        return;
      }
      updatedTemp.pop();
      setTemp([updatedTemp, calc, "+"]);
      return;
    }
    if (calc === "") {
      const updatedTemp = [...temp];
      updatedTemp.pop();
      setTemp([updatedTemp, "+"]);
      // setOpr("+");
      return;
    }
    // setCalc(eval(result + opr + calc).toString());
    // setResult(eval(result + opr + calc));
    setResult(calc);
    setCalc("");
    // setOpr("+");
    setTemp([...temp, calc, "+"]);
    setHasDot(false);
  };

  const divide = () => {
    handleClick("/");
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      // setOpr("+");
      setHasDot(false);
      if (calc === "") {
        setTemp([...temp, "/"]);
        return;
      }
      const updatedTemp = [...temp];
      if (updatedTemp.length === 0) {
        setTemp([...temp, calc, "/"]);
        return;
      }
      updatedTemp.pop();
      setTemp([updatedTemp, calc, "/"]);
      return;
    }
    if (calc === "") {
      const updatedTemp = [...temp];
      updatedTemp.pop();
      setTemp([updatedTemp, "/"]);
      // setOpr("+");
      return;
    }
    // setCalc(eval(result + opr + calc).toString());
    // setResult(eval(result + opr + calc));
    setCalc("");
    setResult(calc);
    // setOpr("+");
    setTemp([...temp, calc, "/"]);
    setHasDot(false);
  };

  const subtract = () => {
    handleClick("-");
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      // setOpr("+");
      setHasDot(false);
      if (calc === "") {
        setTemp([...temp, "-"]);
        return;
      }
      const updatedTemp = [...temp];
      if (updatedTemp.length === 0) {
        setTemp([...temp, calc, "-"]);
        return;
      }
      updatedTemp.pop();
      setTemp([updatedTemp, calc, "-"]);
      return;
    }
    if (calc === "") {
      const updatedTemp = [...temp];
      updatedTemp.pop();
      setTemp([updatedTemp, "-"]);
      // setOpr("+");
      return;
    }
    // setCalc(eval(result + opr + calc).toString());
    // setResult(eval(result + opr + calc));
    setCalc("");
    setResult(calc);
    // setOpr("+");
    setTemp([...temp, calc, "-"]);
    setHasDot(false);
  };

  const multiply = () => {
    handleClick("*");
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      // setOpr("+");
      setHasDot(false);
      if (calc === "") {
        setTemp([...temp, "*"]);
        return;
      }
      const updatedTemp = [...temp];
      if (updatedTemp.length === 0) {
        setTemp([...temp, calc, "*"]);
        return;
      }
      updatedTemp.pop();
      setTemp([updatedTemp, calc, "*"]);
      return;
    }
    if (calc === "") {
      const updatedTemp = [...temp];
      updatedTemp.pop();
      setTemp([updatedTemp, "*"]);
      // setOpr("+");
      return;
    }
    // setCalc(eval(result + opr + calc).toString());
    // setResult(eval(result + opr + calc));
    setCalc("");
    setResult(calc);
    // setOpr("+");
    setTemp([...temp, calc, "*"]);
    setHasDot(false);
  };

  const equal = () => {
    handleClick("=");
    // setCalc(eval(result + opr + calc).toString());
    let calcString = "";
    temp.forEach((element) => {
      calcString += element;
    });
    calcString += calc;
    console.log(calcString);
    const res = eval(fixConsecutiveMinus(calcString));
    setResult(0);
    setCalc(eval(res).toString());
    setStart(false);
    setTemp([eval(res).toString()]);
    setOpr("=");
  };

  function fixConsecutiveMinus(expression) {
    return expression.replace(/-{2}/g, "+");
  }

  const bracket_left = () => {
    handleClick("(");
    setTemp([...temp, "("]);
    setCalc("");
  };

  const bracket_right = () => {
    handleClick(")");
    let calcString = calc;
    const updatedTemp = [...temp];
    while (1) {
      let tempChar = updatedTemp.pop();
      if (tempChar === "(") {
        break;
      }
      calcString = tempChar + calcString;
    }
    setCalc(eval(calcString).toString());
    setTemp([...updatedTemp]);
  };

  const deleteLast = () => {
    handleClick("DEL");
    if (calc === "") {
      return;
    }
    setCalc(calc.slice(0, -1));
  };

  const memoryAdd = () => {
    handleClick("M");
    setMemory(calc.toString());
    setOpr("=");
  };

  const memoryRecall = () => {
    handleClick("MR");
    if (memory === "") {
      return;
    }
    setCalc(memory.toString());
  };

  const clearEntry = () => {
    handleClick("CE");
    setCalc("0");
  };

  const clear = () => {
    handleClick("C");
    setCalc("0");
    setResult(0);
    setOpr("");
    setStart(false);
    setHasDot(false);
    setTemp([]);
  };

  const createDigit = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  function handleClick(buttonText) {
    var timestamp = new Date().toISOString();
    const updatedButtonClicks = [...buttonClicks, { buttonText, timestamp }];
    setButtonClicks(updatedButtonClicks);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span></span> {calc || result.toString()}
        </div>

        <div className="extension">
          <button onClick={clearEntry}>CE</button>
          <button onClick={clear}>C</button>
          <button onClick={memoryAdd}>M</button>
          <button onClick={memoryRecall}>MR</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div class="container">
          <div className="digits">
            {createDigit()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>
            <button onClick={equal}>=</button>
          </div>

          <div className="operators">
            <button onClick={add}>+</button>
            <button onClick={subtract}>-</button>
            <button onClick={multiply}>*</button>
            <button onClick={divide}>/</button>
            <button onClick={bracket_left}>{"("}</button>
            <button onClick={bracket_right}>{")"}</button>
          </div>
        </div>
      </div>
      <div className="history">
        <CSVLink data={buttonClicks} filename={"buttonClicks.csv"}>
          Download buttonClicks.CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default App;
