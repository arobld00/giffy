import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import App from './App';
import About from './About';
import { Route } from 'wouter'
//import Router from './components/Router'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Route component={Home} path="/" />
    <Route component={App} path="/gifs/:keyword" />
    <Route component={About} path="/about" />
  </React.StrictMode>,
  document.getElementById('root')
);

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router routers={[
    {
      path: "/",
      Component: Home
    },
    {
      path: "/gifs/:keyword",
      Component: App
    },
    {
      path: "/about",
      Component: About
    }
  ]} />
)
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
