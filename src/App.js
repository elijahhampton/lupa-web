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

const DIV_MARGIN_SEPARATOR_LENGTH  = 25;
const Logo = require('./logo.jpg');

const PURCHASE_PROGRAM_WEB_ENDPOINT = ""

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
      <Switch>
        <Route path="/:programOwnerUUID/:programUUID/:purchaserUUID" component={LupaWeb} />
        </Switch>
      </Router>
    </Elements>
  );
}

export default App;
