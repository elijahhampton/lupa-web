import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AboutSection from "./AboutSection";
import "./styles.css";

import firebase from '../../firebase/firebase';

import {
  CircularProgress,
} from '@material-ui/core';

import ProgramOffers from "./ProgramOffers";
import About from "./About";

import { connect } from 'react-redux';
import Vlogs from "./Vlogs";

const CURRENT_TAB = ['About', 'Programs', 'Vlogs']

const TrainerProfile = ({ currentUser }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [componentDidErr, setComponentDidErr] = useState(false);
  const [center, setCenter] = useState({ lat: 0, lng: 0})
  const [zoom, setZoom] = useState(1);
  const [currentTab, setCurrentTab] = useState('About')

  useEffect(() => {
      async function loadTrainerProfile() {
        await firebase.firestore().collection('users').doc(id).get()
        .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                const data = documentSnapshot.data();
                setUserData(data);
                setCenter({lat: data.location.latitude, lng: data.location.longitude})
              } else {
                setComponentDidErr(true)
              }
        })
        .catch(error => {
          setComponentDidErr(true)
        })
      }

      setLoading(true)
      loadTrainerProfile();
      setLoading(false);

  }, [id, center]);

  const renderCurrentTab = () => {
    switch(currentTab)
    {
      case 'About':
        return <About userData={userData} center={center} zoom={zoom} />
      case 'Programs':
        return <ProgramOffers programs={userData && userData.programs ? userData.programs : []} />
      case 'Vlogs':
        return <Vlogs vlogs={userData && userData.vlogs ? userData.vlogs : []} />
        return;
      default:
    }
  }

  const renderComponent = () => {
    if (loading) {
      return (
        <div className='full-screen'>
           <CircularProgress color="#23374d" />
           <p className='p-5'>
             Loading...
           </p>
        </div>
      )
    } else if (componentDidErr) {
      return (
        <div className='full-screen'>
            <p>
              Sorry, an error occurred while trying to load this profile.
            </p>
        </div>
      )
    } else {
      return (
      <div className="profile">
      <div className="hero-div w-100 h-auto">
        <div>
          <div className="header-image-container position-relative">
            <img className="avatar" src={userData && userData.photo_url} alt='avatar' />
          </div>
          <div className="tab-bar d-flex align-items-center justify-content-start">
            <div className="tabs position-relative d-flex flex-row align-items-center justify-content-start">
              <div className={`tab h-100 mx-2 ${currentTab == 'About' ? 'selected-tab' : ''}`} onClick={() => setCurrentTab('About')}>
                <h6>About</h6>
              </div>
            <div className={`tab h-100 mx-2 ${currentTab == 'Programs' ? 'selected-tab' : ''}`} onClick={() => setCurrentTab('Programs')}>
                <h6>Programs</h6>
            </div>
            {
              currentUser ?
              <div className={`tab h-100 mx-2 ${currentTab == 'Vlogs' ? 'selected-tab' : ''}`} onClick={() => setCurrentTab('Vlogs')}>
              <h6>Vlogs</h6>
          </div>
          :
          null
            }

          </div>
        </div>
      </div>

      {renderCurrentTab()}
    

    </div>
    </div>
      )
    }
  }

  return renderComponent();
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(TrainerProfile);
