import React from 'react';
import './styles.css';

const AboutSection = ({ icon, image, text }) => {
    return (
        <div className="about-section w-50 d-flex align-items-center flex-row justify-content-evenly">
        
        <div className='w-25 d-flex align-items-center justify-content-center'>
        <div className='about-section-icon-container'>
            {icon}
        </div>
        </div>
        <p className='w-75 small'>
        {text}
        </p>
      </div>
    )
}

export default AboutSection;