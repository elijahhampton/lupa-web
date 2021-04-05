import React from 'react';
import FitnessProgram from './FitnessProgram';
import './styles.css';

const ProgramOffers = ({ programs }) => {
    return (
        <div className='programs-tab'>
        <div className="about my-3">
          <div className="about-header d-flex align-items-center justify-content center">
            <h6 className='p-5'>
              Fitness Programs
            </h6>
          </div>
          <div className="d-flex flex-column align-items-start justify-content-start">
                {
                    programs.map((id, arr, index) => {
                        return <FitnessProgram key={id} id={id} />
                    })
                }
          </div>
        </div>
        </div>
    )
}

export default ProgramOffers;