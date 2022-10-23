
import React from 'react';
import './App.scss';



class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="container calculator">
        <p>Cool Calculator</p>
        <div id="display"></div>
        <button class="btn btn-primary">jk</button>
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
