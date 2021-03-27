import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/home/Home';
import LupaWeb from './pages/checkout-page/LupaWeb';
import LupaTrainerRecommendation from './components/lupa-trainer-recommendation/LupaTrainerRecommendation';
import LupaProgramRecommendation from './components/lupa-program-recommendation/LupaProgramRecommendation';

import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NavBar from './components/navbar/NavBar';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

const App = () => (
    <Elements stripe={stripePromise}>
      <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      {/*  <Route path="/search" component={Search} /> */}
        <Route exact path="/checkout/:programOwnerUUID/:programUUID/:purchaserUUID">
          <LupaWeb />
        </Route>
        <Route  exact path="/trainers/:trainerUUID">
          <LupaTrainerRecommendation />
        </Route>
        <Route exact path="/programs/:programUUID">
          <LupaProgramRecommendation />
        </Route>
        </Switch>
        </Router>
    </Elements>
)

export default App;
