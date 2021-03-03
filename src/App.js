import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'
import MediaQuery from 'react-responsive';
import {
  Button, 
  Paper, 
  TextField, 
  Box,
  AppBar,
  Typography,
  Container,
  Divider,
} from '@material-ui/core';
import LupaWeb from './LupaWeb';
import {CardElement, useStripe, useElements, Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LupaTrainerRecommendation from './LupaTrainerRecommendation';
import LupaProgramRecommendation from './LupaProgramRecommendation';
import Home from './Home';
import Search from './Search';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
      <Switch>
        <Route path="/" component={Home} />
      {/*  <Route path="/search" component={Search} /> */}
        <Route path="/checkout/:programOwnerUUID/:programUUID/:purchaserUUID" component={LupaWeb} />
        <Route path="/trainers/:trainerUUID" component={LupaTrainerRecommendation} />
        <Route path="/programs/:programUUID" component={LupaProgramRecommendation} />
        </Switch>
      </Router>
    </Elements>
  );
}

export default App;
