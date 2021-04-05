import React from 'react';
import './styles.css';

import Vlog from './Vlog';

const Vlogs = ({ vlogs }) => {
    return (
        <div className='vlogs-tab'>
        <div className="about my-3">
          <div className="about-header d-flex align-items-center justify-content center">
            <h6 className='p-5'>
              Vlogs
            </h6>
          </div>
          <div className="d-flex flex-column align-items-start justify-content-start">
                {
                    vlogs.map(id => {
                        return <Vlog id={id} />
                    })
                }
          </div>
        </div>
        </div>
    )
}

export default Vlogs;