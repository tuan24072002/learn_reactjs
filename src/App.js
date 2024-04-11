import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React from 'react';
const App = () => {
  const count = useSelector(state => state.counter.count);
  const name = useSelector(state => state.counter.name);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World With &amp; Tran Le Anh Tuan
        </p>
        <div>Count = {count}</div>
        <div>Name = {name}</div>
        <button className='btn btn-primary' onClick={() => dispatch(increaseCounter())}>Increase</button>
        <button className='btn btn-danger' onClick={() => {
          if (count > 0) {
            dispatch(decreaseCounter())
          } else {
            alert("Nooooooooooooooooooooooo")
          }
        }}>Decrease</button>
      </header>
    </div>
  );
}
export default App;
