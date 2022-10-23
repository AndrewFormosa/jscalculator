
import React from 'react';
import './App.scss';




class CalcButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleButton=this.handleButton.bind(this);
  }


handleButton(e){
  this.props.buttonCallBack(e);
}

  render() {
    return (
        <button value={this.props.properties.type} onClick={this.handleButton} id={this.props.properties.id} class="but-calc" style={{background:this.props.properties.col}}>{this.props.properties.op}</button>
    );
  }
}


const numKeyColor="grey";
const opKeyColor="green";
const specialKeyColor="red";

const keyData =   [
  {"id":"clear","op":"C", "col":specialKeyColor,"type":"sp"},
  {"id":"half-clear","op":"CE", "col":specialKeyColor,"type":"sp"},
  {"id":"add","op":"+", "col":opKeyColor,"type":"op"},
  {"id":"subtract","op":"-", "col":opKeyColor,"type":"op"},
  {"id":"one","op":"1", "col":numKeyColor,"type":"num"},
  {"id":"two","op": "2", "col":numKeyColor,"type":"num"},
  {"id":"three","op": "3", "col":numKeyColor,"type":"num"},
  {"id":"multiply","op":"*", "col":opKeyColor,"type":"op"},
  {"id":"four","op":"4","col":numKeyColor,"type":"num"},
  {"id":"five","op":"5","col":numKeyColor,"type":"num"},
  {"id":"six","op":"6","col":numKeyColor,"type":"num"},
  {"id":"divide","op":"/", "col":opKeyColor,"type":"op"},
  {"id":"seven","op":"7","col":numKeyColor,"type":"num"},
  {"id":"eight","op":"8","col":numKeyColor,"type":"num"},
  {"id":"nine","op":"9","col":numKeyColor,"type":"num"},
  {"id":"equals","op":"=", "col":opKeyColor,"type":"op"},
  {"id":"zero","op":"0","col":numKeyColor,"type":"num"},
  {"id":"decimal","op":".","col":numKeyColor,"type":"num"}];



class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input:"",
      total:"",
    };
    this.recieveButtonClick=this.recieveButtonClick.bind(this);
  }

  recieveButtonClick(e){



    
    this.setState({input:this.state.input.concat(e.target.textContent)})




  }

  render() {
    const keyPad = [];
    for (let i = 0; i < 9; i++) {
      keyPad.push(<CalcButton />);
    }

    return (
      <div class="container calculator">
        <p>React Calculator</p>
        <div id="display">{this.state.input}</div>
        <div class="key-pad my-2">
          <div class="row d-flex align-items-center justify-content-center">
            {keyData.map((val)=><CalcButton properties={val} buttonCallBack={(x)=>this.recieveButtonClick(x)}/>)}
          </div>
        </div>
      </div>
    );
  }

}


function App() {
  let x = 10;
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
