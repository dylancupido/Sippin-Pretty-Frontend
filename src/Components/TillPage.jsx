import './Styles/Till.css';


function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        // Evaluate the expression using Function (safer than eval)
        const evalResult = Function('"use strict";return (' + input + ')')();
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8","9",
    "+", "0", "-",
    "/", "="
        ];
    
  return (
    <div ClassName = "top-left-container"> 
        <div>Input: {input}</div>
        <div>Result: {result}</div>
    <div > 
        
        {buttons.map((btn, index) => (
            <React.Fragment key = {index}>
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
          {(index + 1) % 3 === 0 && <br />}
          </React.Fragment>
        ))}
      </div>
</div>
  );
}

export default Calculator;