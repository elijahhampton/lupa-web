import React from 'react';
import { useHistory } from 'react-router-dom';

import { MdCallMade } from 'react-icons/md'

const NavBar = () => {
    const history = useHistory();

    return (
        <nav class="navbar navbar-expand-lg navbar-dark">
          <button type="button navbar-brand" class="btn btn-primary">Lupa</button>
 
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
             <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">

          <li class="nav-item">
          <div class="d-flex flex-row align-items-center">
{/* <button type="button" class="btn btn-primary" onClick={() => history.push('/Search')}>See Trainers <span>          <MdCallMade size={20} /></span></button>
<button type="button" class="btn btn-primary">Login <span>          <MdCallMade size={20} /></span></button> */}
</div>
          </li>
      </ul> 
    </div> 
          </nav>
    )
}

export default NavBar;