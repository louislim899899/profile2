import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import './assets/styles/main.scss';
import './assets/styles/main.module.scss'
import Header from './screens/layouts/Header';
import Body from './screens/layouts/Body';
import SplashScreen from './screens/SplashScreen'

function App() {
  return (
    <div className="app">
      <SplashScreen/>

      <div className='container'>
        <header className="App-header">
          <Header />
        </header>
        <main>
          <Body />
        </main>
      </div>
    </div>
  );
}

export default App;
