import React, { useState } from 'react';
import './App.css';

import MobileMockup from './images/lupa_mobile.png'
import MobileMockup2 from './images/lupa_mobile2.png'
import iOSDownload from './images/appstoredownload.png';
import Test from './images/test.png';
import LupaLogo from './images/appstore.png'

import {  FiArrowRightCircle, FiChevronDown } from "react-icons/fi";
import { FaAndroid, FaApple } from "react-icons/fa";
import { MdCallMade } from 'react-icons/md'
import SearchBar from "material-ui-search-bar";

import {
  Button
} from '@material-ui/core'

import algoliasearch from 'algoliasearch';

import { FiCheck, FiSmartphone, FiRss } from "react-icons/fi";

import {
  InstantSearch,
  Hits,
  SearchBox,
} from 'react-instantsearch-dom';
import { useHistory } from 'react-router-dom';
import NavBar from './components/common/NavBar';

function Home(props) {
  const history = useHistory();

  return (
    <div class="App">
         <section class="title">
        <div class="container-fluid">
          <NavBar />
        </div>
      </section>
 

      <section class="title container-fluid w-100 h-100">
      <h1 class="w-50 display-block align-self-center" >Find certified personal trainers and fitness programs</h1>
          <div class="d-flex flex-row justify-content-evenly align-items-center section-att">
            <div class="col-lg-4 d-flex flex-column align-items-center justify-content-center text-align-left">
             
              <p class="w-75 fw-light">
                Stop wasting money on gym subscriptions.  Find the personal trainers instantly at effective rates.
              </p>     
            </div>

            <div  class="col-lg-4 d-flex flex-row justify-content-center align-items-center">
              <img class="title-image" src={MobileMockup} alt="iphone-mockup" />
            </div>

            <div class="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <button type="button" class="btn btn-dark download-button d-flex flex-row align-items-center">
                  <FaApple size={20} style={{marginRight: '10'}} />
                  Download it for iOS
                  </button>
                <button type="button" id="android-button" class="disabled btn btn-light border download-button">
                <FaAndroid size={20} style={{marginRight: '10'}} />
                  Coming soon to Android
                  </button>
              </div>
          </div>


          <img id="lupa-logo" src={LupaLogo} alt="iphone-mockup" />

          <div id="legal-footer">
      <h6 class="legal-footer-item text-decoration-underline">
          Privacy Policy
        </h6>

        <h6 class="legal-footer-item text-decoration-underline">
          Terms of Service
        </h6>
      </div>

      </section>



    </div>

  )
}

export default Home;

const classes = {
  root: {
    backgroundColor: '#EEEEEE'
  }
}