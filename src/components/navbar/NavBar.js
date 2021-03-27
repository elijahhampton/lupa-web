import React from 'react';
import './styles.css';

const NavBar = () => (
  <nav class="navbar navbar-expand-lg navbar-dark">
    <button type="button navbar-brand" class="btn btn-primary">Lupa</button>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">

        <li class="nav-item">
          <div class="d-flex flex-row align-items-center">
            <button type="button" class="btn option">Privacy Policy</button>
            <button type="button" class="btn option">Terms of Service</button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
)

export default NavBar;