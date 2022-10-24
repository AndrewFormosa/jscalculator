
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
  { "id": "half-clear", "op": "CE", "col": specialKeyColor, "type": "sp" },
  { "id": "add", "op": "+", "col": opKeyColor, "type": "op" },
  { "id": "subtract", "op": "-", "col": opKeyColor, "type": "op" },
  { "id": "one", "op": "1", "col": numKeyColor, "type": "num" },
  { "id": "two", "op": "2", "col": numKeyColor, "type": "num" },
  { "id": "three", "op": "3", "col": numKeyColor, "type": "num" },
  { "id": "multiply", "op": "*", "col": opKeyColor, "type": "op" },
  { "id": "four", "op": "4", "col": numKeyColor, "type": "num" },
  { "id": "five", "op": "5", "col": numKeyColor, "type": "num" },
  { "id": "six", "op": "6", "col": numKeyColor, "type": "num" },
  { "id": "divide", "op": "/", "col": opKeyColor, "type": "op" },
  { "id": "seven", "op": "7", "col": numKeyColor, "type": "num" },
  { "id": "eight", "op": "8", "col": numKeyColor, "type": "num" },
  { "id": "nine", "op": "9", "col": numKeyColor, "type": "num" },
  { "id": "equals", "op": "=", "col": opKeyColor, "type": "op" },
  { "id": "zero", "op": "0", "col": numKeyColor, "type": "num" },
  { "id": "decimal", "op": ".", "col": numKeyColor, "type": "num" }];

const containsANumber = (x) => ((/[0-9]/).test(x));
const containsDecimal = (x) => (/[.]/).test(x);
const firstButtonCheck = (x) => (/[1-9+-.]/).test(x);
const isMathsFunction = (x) => (/[/*+-]/).test(x);
const isCalcFunction = (x) => (/[C=]/).test(x);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      total: "total",
      lastkey: "C",
      tester: true,
    };
    this.recieveButtonClick = this.recieveButtonClick.bind(this);
    this.takeInput = this.takeInput.bind(this);
    //this.opTest=this.opTest.bind(this);
  }



  recieveButtonClick(e) {
    let key = e.target.textContent;
    let myinput = this.state.input;

    //if its a number
    if(containsANumber(key)){
      {
        if(myinput.length==1&myinput=="0"){
          this.setState({input:key})
        }else{
         this.takeInput(key);
      }}
    }
    //if its a decimal point
    if(key=="."&&!containsDecimal(myinput)){
      if(myinput.length>0){
        this.takeInput(key);
      }else{
        this.takeInput("0.");
      }
      }
    
      //if its a maths function
    if(isMathsFunction(key)){
      if(!isMathsFunction(myinput)){
      this.setState({total:this.state.total.concat(this.state.input)});}
      this.setState({input:key});
    }
  }
  

    takeInput(inp){
      this.setState({ input: this.state.input.concat(inp) })
    }



    render() {
      const keyPad = [];
      for (let i = 0; i < 9; i++) {
        keyPad.push(<CalcButton />);
      }

      return (
        <div class="container calculator">
          <p>React Calculator</p>
          <div id="display"><div>{this.state.input}</div><div>{this.state.total.concat(this.state.input)}</div></div>
          <div class="key-pad my-2">{eval("2.+3")}
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
