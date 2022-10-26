
import React from 'react';
import './App.scss';




class CalcButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleButton = this.handleButton.bind(this);
  }


  handleButton(e) {
    this.props.buttonCallBack(e);
  }

  render() {
    return (
      <button value={this.props.properties.type} onClick={this.handleButton} id={this.props.properties.id} class="but-calc" style={{ background: this.props.properties.col }}>{this.props.properties.op}</button>
    );
  }
}


const numKeyColor = "grey";
const opKeyColor = "green";
const specialKeyColor = "red";

const keyData = [
  { "id": "clear", "op": "C", "col": specialKeyColor, "type": "sp" },
 // { "id": "half-clear", "op": "CE", "col": specialKeyColor, "type": "sp" },
  { "id": "add", "op": "+", "col": opKeyColor, "type": "op" },
  { "id": "subtract", "op": "-", "col": opKeyColor, "type": "op" },


  { "id": "multiply", "op": "*", "col": opKeyColor, "type": "op" },

  { "id": "one", "op": "1", "col": numKeyColor, "type": "num" },
  { "id": "two", "op": "2", "col": numKeyColor, "type": "num" },
  { "id": "three", "op": "3", "col": numKeyColor, "type": "num" },
  { "id": "divide", "op": "/", "col": opKeyColor, "type": "op" },
  { "id": "four", "op": "4", "col": numKeyColor, "type": "num" },
  { "id": "five", "op": "5", "col": numKeyColor, "type": "num" },
  { "id": "six", "op": "6", "col": numKeyColor, "type": "num" },
  { "id": "equals", "op": "=", "col": opKeyColor, "type": "op" },
  { "id": "seven", "op": "7", "col": numKeyColor, "type": "num" },
  { "id": "eight", "op": "8", "col": numKeyColor, "type": "num" },
  { "id": "nine", "op": "9", "col": numKeyColor, "type": "num" },
  { "id": "decimal", "op": ".", "col": numKeyColor, "type": "num" },
  { "id": "zero", "op": "0", "col": numKeyColor, "type": "num" }
 ];

const containsANumber = (x) => ((/[0-9]/).test(x));
const containsDecimal = (x) => (/[.]/).test(x);
const firstButtonCheck = (x) => (/[1-9+-.]/).test(x);
const isMathsFunction = (x) => (/[/*+]/).test(x);
const isCalcFunction = (x) => (/[C=]/).test(x);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      total: "",
      lastkey: "0",
      tester: true,
    };
    this.recieveButtonClick = this.recieveButtonClick.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setLast = this.setLast.bind(this);
    this.addToInput = this.addToInput.bind(this);
    this.addToTotal = this.addToTotal.bind(this);
    this.setTotal = this.setTotal.bind(this);
    //this.opTest=this.opTest.bind(this);
  }



  recieveButtonClick(e) {

    let newKey = e.target.textContent;
    let inputLine = this.state.input;
    let totalLine = this.state.total;
    let lastKey = this.state.lastkey;





    //if its a number
    if (containsANumber(newKey)) {


      if (isMathsFunction(lastKey) || (lastKey == "-")) {
        if (inputLine == "--") {
          inputLine = "+";
        }
        this.addToTotal(inputLine);
        this.setInput(newKey);
      } else if (inputLine == "0" && inputLine.length == 1) {
        this.setInput(newKey);
      } else if (lastKey == "=") {
        this.setInput(newKey);
        this.setTotal("");
        this.setLast(newKey);
      } else {
        this.addToInput(newKey);
      }
      this.setLast(newKey);
    }
    //decimal point
    if (newKey == ".") {

      if (isMathsFunction(lastKey)) {
        this.addToTotal(inputLine);
        this.setInput("0.");
      } else if (inputLine.length == 0) {
        this.setInput("0.");
      } else if (lastKey == "=") {
        this.setInput("0.");
        this.setTotal("");
        this.setLast(newKey);
      } else if (!containsDecimal(inputLine)) {
        this.addToInput(newKey);
      }
      this.setLast(newKey);
    }

    //maths functions exc minus
    if (isMathsFunction(newKey)) {
      if (!isMathsFunction(lastKey) && lastKey != "-") {
        if (lastKey == ".") {
          inputLine = inputLine.concat("0");
        }
        this.addToTotal(inputLine);
      }
      this.setInput(newKey);
      this.setLast(newKey);
    }

    //minus
    if (newKey == "-") {
      //check if its used as a function (ie follows a number)
      if (containsANumber(lastKey) || lastKey == "=") {
        this.addToTotal(inputLine);
        this.setInput(newKey)
      }
      if (lastKey == ".") {
        inputLine = inputLine.concat("0");
        this.addToTotal(inputLine);
        this.setInput(newKey);
      }
      //check if its used as a number ie follows a function.
      if (isMathsFunction(lastKey)) {
        this.addToInput(newKey);
      }
      if (inputLine == "-") {
        this.addToInput(newKey);
      }
      this.setLast(newKey);
    }

    //Cancel
    if (newKey == "C") {
      this.setInput("0");
      this.setTotal("");
      this.setLast("0");
    }
    //Equals
    if (newKey == "=") {
      let calc;
      if (containsANumber(inputLine)) {
        calc = totalLine.concat(inputLine);
      } else { calc = totalLine; }
      let answer = eval(calc);
      this.setInput(answer);
      this.setTotal("");
      this.setLast("=");
    }



  }


  //if its a "-"



  addToInput(x) {
    this.setState({ input: this.state.input.concat(x) });
  }

  setInput(x) {
    this.setState({ input: x });
  }

  addToTotal(x) {
    this.setState({ total: this.state.total.concat(x) });
  }

  setLast(x) {
    this.setState({ lastkey: x });
  }

  setTotal(x) {
    this.setState({ total: x });
  }

  render() {
    const keyPad = [];
    for (let i = 0; i < 9; i++) {
      keyPad.push(<CalcButton />);
    }

    return (
      <div class="container calculator">
        <p>F10 - React Calculator</p>
        <div id="full-display">
        
            <div class="total-display" id="display">{this.state.total.concat(this.state.input)}</div>
           
       
            <div class="input-display d-flex justify-content-end"> {this.state.input}</div>
          
        </div>
        <div class="key-pad my-2">
          <div class="row d-flex align-items-center justify-content-center">
            {keyData.map((val) => <CalcButton properties={val} buttonCallBack={(x) => this.recieveButtonClick(x)} />)}
          </div>
        </div>
      </div>
    );
  }

}


function App() {
  let x = 8;
  let str = "x*2+3*2";
  let ans = eval(str);


  return (
    <div class="min-vh-100 d-flex align-items-center justify-content-center py-3 App">
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;
