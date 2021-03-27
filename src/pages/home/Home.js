import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../../App.css';
import './styles.css';

import MobileMockup from '../../assets/images/lupa_mobile.png'

import { FaAndroid, FaApple } from "react-icons/fa";

import { ReactComponent as InPersonTraining } from '../../assets/images/InPersonTraining.svg';
import { ReactComponent as VirtualTraining } from '../../assets/images/VirtualTraining.svg';
import { ReactComponent as FitnessPrograms } from '../../assets/images/FitnessPrograms.svg';
import { ReactComponent as FitnessProgramsPlus } from '../../assets/images/FitnessProgramsPlus.svg';
import FitnessGirls from '../../assets/images/fitness-girls.jpeg';
import FitnessProgramsDisplay from '../../assets/images/fitness-programs-display.jpg';

import PacksInformation from '../../components/PacksInformation/PacksInformation';
import ProgramInformation from '../../components/ProgramInformation/ProgramInformation';

import DB from '../../firebase/firebase';

const Home = () => {
  const history = useHistory();
  const [meetMeTrainers, setMeetMeTrainers] = useState([]);

  useEffect(() => {
    async function loadMeetMeTrainers() {
      setMeetMeTrainers([])
      DB.collection('users').where('account_type', '==', 'trainer').limit(10).get().then(querySnapshot => {
        querySnapshot.docs.forEach(documentSnapshot => {
          const userData = documentSnapshot.data();
          if (userData && userData.display_name) {
            setMeetMeTrainers(oldArr => [...oldArr, userData]);
          }
        })
      })
    }

    loadMeetMeTrainers();
  }, []);

  const renderMeetMeTrainers = () => {
    return meetMeTrainers.map(({ photo_url, display_name, user_uuid }) => {
      return (
        <div className='meet-me-trainer-container' onClick={() => history.push(`/trainers/${user_uuid}`)}>
          <div className='meet-me-avatar'>
            <img className='meet-me-avatar-image' src={photo_url} alt='trainer' />
          </div>

          <p className='meet-me-trainer-display-name-text'>
            Meet {display_name}
          </p>
        </div>
      )
    })
  }

  return (
    <div className="home-page">
      <div className="full-page">
        <h1 class="w-50 display-block align-self-center text-center" style={{ fontWeight: 'bolder' }}>Find certified personal trainers and fitness programs.</h1>
        <div class="d-flex flex-column flex-md-row justify-content-evenly align-items-center section-att">
          <div class="col-lg-4 d-flex flex-column align-items-center justify-content-center text-align-left">

            <p class="w-75 fw-light text-center">
              Stop wasting money on gym subscriptions.  Find personal trainers instantly in the gym or at home.
              </p>
          </div>

          <div class="col-lg-4 d-flex flex-row justify-content-center align-items-center" style={{ marginBottom: 20 }}>
            <img id="title-image" src={MobileMockup} alt="iphone-mockup" />
          </div>

          <div class="col-lg-4 d-flex flex-column align-items-center justify-content-center">
            <button onClick={() => window.location.replace('https://apps.apple.com/us/app/lupa-find-personal-trainers/id1510062386')} type="button" class="btn btn-dark download-button d-flex flex-row align-items-center">
              <FaApple size={20} style={{ marginRight: '10' }} />
                  Download it for iOS
                  </button>
            <button type="button" id="android-button" class="disabled btn btn-light border download-button">
              <FaAndroid size={20} style={{ marginRight: '10' }} />
                  Coming soon to Android
                  </button>
          </div>
        </div>
      </div>

      <div className='section w-100 d-flex flex-column flex-md-row justify-content-evenly align-items-center my-5'>
        <div style={{ flex: 1 }}>
          <PacksInformation />
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={FitnessGirls} id='packs-image' alt='packs' />
          <div style={{ position: 'absolute', zIndex: 2, bottom: 0, right: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'white', fontWeight: 'bolder', width: '40%' }} className='fs-md-1 fs-4' >
              Workout with your best friends
            </h2>
          </div>
        </div>
      </div>

      <div className='section w-100 d-flex flex-column-reverse flex-md-row justify-content-evenly align-items-center my-5'>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={FitnessProgramsDisplay} id='packs-image' alt='packs' />
          <div style={{ position: 'absolute', zIndex: 2, bottom: 0, right: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'white', fontWeight: 'bolder', width: '40%' }} className='fs-md-1 fs-6' >
              Create, buy, and sell fitness programs.
            </h2>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <ProgramInformation />
        </div>
      </div>

      <section id="offers-section" className='section'>
        <h2 className='section-header-text'>
          Why choose lupa?
          </h2>
        <div className="d-flex flex-column flex-md-row justify-content-evenly w-100 mt-5">
          <div className='d-flex flex-column align-items-center'>
            <InPersonTraining className='offer-icon' />
            <div className='offer-description-container'>
              <h6> In Person Training </h6>
              <p className='offer-description-text'>
                Book trainers for in person workouts.  A faster experience connecting with your local personal trainer that automatically measures your progress.
                </p>
            </div>
          </div>

          <div className='d-flex flex-column align-items-center'>
            <VirtualTraining className='offer-icon' />
            <div className='offer-description-container'>
              <h6> Virtual Training </h6>
              <p className='offer-description-text'>
                Lupa provides live video training available anywhere you have a phone.
                </p>
            </div>
          </div>

          <div className='d-flex flex-column align-items-center'>
            <FitnessPrograms className='offer-icon' />
            <div className='offer-description-container'>
              <h6> Fitness Programs </h6>
              <p className='offer-description-text'>
                After a virtual consultation with an industry professional, have a custom made program made for you with full trainer support directly through the app.
                </p>
            </div>
          </div>

          <div className='d-flex flex-column align-items-center'>
            <FitnessProgramsPlus className='offer-icon' />
            <div className='offer-description-container'>
              <h6> Fitness Programs + </h6>
              <p className='offer-description-text'>
                Through matching and curation from Lupa, clients may purchase workout prograams with durations from 2 weeks to 2 year periods to support their unique lifestyle.
                </p>
            </div>
          </div>
        </div>
      </section>


      <div className='section d-flex flex-column align-items-center justify-content-center'>
        <h2 className='my-5 section-header-text'>
          What are you waiting for?
        </h2>
        <div className='d-flex align-items-center flex-column flex-md-row justify-content-evenly w-100'>
          {renderMeetMeTrainers()}
        </div>
      </div>


      <div className='footer d-flex flex-row align-items-center justify-content-between'>
        <p className='footer-text'>
          Copyright 2021 RheaSilvia LLC. All rights reserved.
        </p>

        <p className='footer-text'>
          United States
        </p>
      </div>
    </div>
  )
}

export default Home;

//create programs
//personal/virtual training
//