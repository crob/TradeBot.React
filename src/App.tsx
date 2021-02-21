import React from 'react';
import './App.scss';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
          <Switch>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        {/* <Loader /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
