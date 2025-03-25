import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './services/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Splash from './components/common/Splash';
import AboutScreen from './screens/AboutScreen';
import Layout from './screens/layouts/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>

  <React.StrictMode>
    {/* <BrowserRouter basename={process.env.PUBLIC_URL || '/'}> */}
    <BrowserRouter>
    <Splash />
    <Layout>
      <Routes>
          <Route index element={<HomeScreen />} />
          <Route path='/about' element={<AboutScreen />} />
      </Routes>
      </Layout>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>
      
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
