import React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../firebase/firebase';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';

import './styles.css';

const NavBar = ({ currentUser }) => {
  const getCurrentUser = () => {
    return currentUser ?
      (<Link
        className='option'
        to='/signin'>
        SIGN IN
      </Link>)
      :
      (
        <div
          className='option'
          onClick={() => firebase.auth().signOut()}>
          SIGN OUT
        </div>
      )
  }


  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <Link type="button navbar-brand" class="btn btn-primary" to='/'>Lupa</Link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

          <li class="nav-item">
            <div class="d-flex flex-row align-items-center">
            {
              currentUser ?
              (<Link className='btn option' to='/searchtrainers'>
              Search Trainers
            </Link>)
              :
              null
            }

              <Link className='btn option' to='/'>
                Privacy Policy
            </Link>

              <Link className='btn option' to='/'>
                Terms of Service
            </Link>

              {
                currentUser ?
                  (<div
                    className='btn option'
                    onClick={() => firebase.auth().signOut()}>
                    Sign Out
                  </div>)
                  :
                  (<Link
                    className='btn option'
                    to='/signin'>
                    Sign In
                  </Link>)
              }
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})


export default connect(mapStateToProps)(NavBar);