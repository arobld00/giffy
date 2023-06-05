import { React, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // static import
//import { Route } from 'wouter'
import { Route } from './Route'
import { Router } from './components/Router'
import reportWebVitals from './reportWebVitals';

const Home = lazy(() => import('./Home'))
const App = lazy(() => import('./App'))
const About = lazy(() => import('./About')) // dynamic import

/*
ReactDOM.render(
  <React.StrictMode>
    <Route component={Home} path="/" />
    <Route component={App} path="/gifs/:keyword" />
    <Route component={About} path="/about" />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loading...</div>}>
    <Router routers={[{ path: "/gifs/:keyword", Component: App }]}>
      <Route path='/' Component={Home}></Route>
      <Route path='/about' Component={About}></Route>
    </Router>
  </Suspense>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
