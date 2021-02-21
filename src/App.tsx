import React from 'react';
import './App.scss';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Box as="main" bgGradient="linear(to-t,var(--body-background),gray.800)">
        <Switch>
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={Home} />
        </Switch>
        {/* <Loader /> */}
      </Box>
      <Footer />
    </div>
  );
}

export default App;
