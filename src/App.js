import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from './pages/home/Home';
import LupaWeb from './pages/checkout-page/LupaWeb';
import LupaTrainerRecommendation from './components/lupa-trainer-recommendation/LupaTrainerRecommendation';
import LupaProgramRecommendation from './components/lupa-program-recommendation/LupaProgramRecommendation';
import Search from './pages/search/Search';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import firebase, { auth } from './firebase/firebase';

import AuthenticationComponent from './pages/authentication/AuthenticationComponent'

import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NavBar from './components/navbar/NavBar';
import React from 'react';
import TrainerProfile from './pages/TrainerProfile/TrainerProfile';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        setCurrentUser(user.uid)
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Elements stripe={stripePromise}>
      <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path='/signin' render={() => this.props.currentUser ?  (<Redirect to='/' /> ) : ( <AuthenticationComponent /> )} />
        <Route exact path='/searchtrainers' render={() => this.props.currentUser ?  (<Search /> ) : (<Redirect to='/' /> )} />
        <Route exact path="/checkout/:programOwnerUUID/:programUUID/:purchaserUUID">
          <LupaWeb />
        </Route>
        <Route  exact path="/trainers/:trainerUUID">
          <LupaTrainerRecommendation />
        </Route>
        <Route exact path="/programs/:programUUID">
          <LupaProgramRecommendation />
        </Route>
        <Route exact path='/trainer/:id'>
          <TrainerProfile />
        </Route>
        </Switch>
        </Router>
    </Elements>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
