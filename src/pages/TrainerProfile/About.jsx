import React from 'react';
import AboutSection from './AboutSection';
import './styles.css';

import { FiActivity, FiCalendar, FiNavigation, FiSend, FiInfo, FiFolder, FiThumbsUp } from "react-icons/fi";
import GoogleMapReact from 'google-map-react';

const About = ({ userData, center, zoom }) => {
    const AnyReactComponent = ({ text }) => <div className='marker'>{text}</div>;

    const renderTrainingStyles = () => {
      if (!userData) {
        return <p></p>
      }
  
      const styles = userData && userData.trainer_metadata.training_styles.map((style, index, arr) => {
        if (arr.length - 1 == index) {
          return (
              <p> and {style}.</p>
          )
        }
        return (
              <p>{style},{' '}</p>
        )
      })
  
      return (
      <div className='d-flex flex-row align-items-center'>
        {styles}
      </div>
      )
    }

    const renderBio = () => {
        if (userData && userData.bio) {
          if (userData.bio == '') {
            return 'No bio has been setup by this user.'
          } else {
            return `${userData && userData.bio}`
          }
        }
    }


    return (
        <div className='about-tab'>
      <div className="about my-3">
        <div className="about-header d-flex align-items-center justify-content center">
          <h6 className='p-5'>
            Bio
          </h6>
        </div>
        <div  className="d-flex flex-row align-items-center justify-content-center">
            <p className='p-3'>
              {renderBio()}
            </p>
        </div>
      </div>

      <div className="about my-3">
        <div className="about-header d-flex align-items-center justify-content center">
          <h6 className='p-5'>
            About
          </h6>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center flex-wrap">

          <AboutSection icon={<FiCalendar />} text={`${userData && userData.display_name} has no available times for a session today.`} />

          <AboutSection icon={<FiInfo />} text={`${userData && userData.display_name} home gym is set as ${userData && userData.homegym.name}.`} />

          <AboutSection icon={<FiNavigation />} text={`${userData && userData.display_name} is based out of ${userData && userData.location.city}, ${userData && userData.location.state}.`} />

          <AboutSection icon={<FiThumbsUp />} text={renderTrainingStyles()} />

          <AboutSection icon={<FiFolder />} text={`${userData && userData.display_name} has created ${userData && userData.programs.length} fitness programs.`} />

          <AboutSection icon={<FiSend />} text={`Have a question for ${userData && userData.display_name}?`} />
        </div>
      </div>

      <div className='location-map'>
      <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAPrxdNkncexkRazrgGy4FY6Nd-9ghZVWE' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={center.lat}
            lng={center.lng}
            text="Home Gym"
          />
        </GoogleMapReact>
      </div>
      </div>
    )
}

export default About;