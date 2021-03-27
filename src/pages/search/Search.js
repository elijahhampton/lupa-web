import React, { useState } from 'react';

import {
  InstantSearch,
  Hits,
} from 'react-instantsearch-dom';

import {
  Avatar,
} from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import algoliasearch from 'algoliasearch';
import CustomSearchBox from '../../components/search-bar/SearchBar';
import STATES from '../../common/States';
import CERTIFICATIONS from '../../common/Certifications';
import RATES from '../../common/Rates';
import INTEREST from '../../common/Interest';
import NavBar from '../../components/navbar/NavBar';

const searchClient = algoliasearch('EGZO4IJMQL', '883fd25a4271423ab63d5cb5d5096f72');

const Hit = ({ hit, state, certification, rate, interest }) => {
  if (hit.isTrainer == false) {
    return null;
  }

  return (
    <div class="hit-container" style={{ width: 230, height: 210 }}>
      <div class="d-flex flex-column justify-content-start align-items-start">
        <Avatar src={hit.photo_url} style={{ width: 150, height: 150 }} variant="rounded" className={classes.large} />
        <div>
          <p className="hit-text">
            {hit.display_name}
          </p>
          <p className="hit-text">
            {hit.certification}
          </p>
          <p id="hourly-payment-rate-text" className="hit-text text-decoration-underline">
            ${hit.hourly_payment_rate} / hr
        </p>
          <p>
            {hit.bio}
          </p>
        </div>
        <button type="button" class="btn btn-sm btn-outline-dark">Book {hit.display_name}</button>
      </div>
    </div>
  )
}

function Search(props) {
  const classes = useStyles();

  const [state, setState] = useState("");
  const [certification, setCertification] = useState("");
  const [rate, setRate] = useState(0);
  const [interest, setInterest] = useState("");

  const handleOnChangeState = (e) => {
    const { value } = e.target;
    setState(value);
  }

  const handleOnChangeCertification = (e) => {
    const { value } = e.target;
    setCertification(value);
  }

  const handleOnChangeRate = (e) => {
    const { value } = e.target;
    setRate(value);
  }

  const handleOnChangeInterest = (e) => {
    const { value } = e.target;
    setInterest(value);
  }

  return (
    <div class="container-fluid">
      <NavBar />
      <div className="main-page">
        <section class="title">
          <div class="container-fluid" />
        </section>

        <section id="informational-text">
          <h4 id="search-text">
            You're looking for
          </h4>
          <h4 id="search-category-text">
            Personal Trainers
          </h4>
        </section>

        <section id="search-controls" class="d-flex flex-row align-items-center">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
            <Select
              style={{ width: 160, height: 60 }}
              classes={classes.root}
              native
              value={state}
              onChange={handleOnChangeState}
              label="State"
              inputProps={{
                name: 'state',
                id: 'outlined-state-native-simple',
              }}
            >
              {
                STATES.map((state, index, arr) => {
                  return <option value={state}>{state}</option>
                })
              }
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Certifications</InputLabel>
            <Select
              style={{ width: 160, height: 60 }}
              classes={classes.root}
              native
              value={certification}
              onChange={handleOnChangeCertification}
              label="Certification"
              inputProps={{
                name: 'certification',
                id: 'outlined-certification-native-simple',
              }}
            >
              {
                CERTIFICATIONS.map((state, index, arr) => {
                  return <option value={state}>{state}</option>
                })
              }
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Rate</InputLabel>
            <Select
              style={{ width: 160, height: 60 }}
              classes={classes.root}
              native
              value={rate}
              onChange={handleOnChangeRate}
              label="Rate"
              inputProps={{
                name: 'rate',
                id: 'outlined-rate-native-simple',
              }}
            >
              {
                RATES.map((state, index, arr) => {
                  return <option value={state}>{state}</option>
                })
              }
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Interest</InputLabel>
            <Select
              style={{ width: 160, height: 60 }}
              classes={classes.root}
              native
              value={interest}
              onChange={handleOnChangeInterest}
              label="Interest"
              inputProps={{
                name: 'interest',
                id: 'outlined-interest-native-simple',
              }}
            >
              {
                INTEREST.map((state, index, arr) => {
                  return <option value={state}>{state}</option>
                })
              }
            </Select>
          </FormControl>
        </section>

        <InstantSearch indexName="dev_USERS" searchClient={searchClient}>
          <CustomSearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    </div>
  )
}

const classes = {
  root: {
    width: '120'
  }
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    width: 400,
    height: 150,
    margin: '15px 0px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));


export default Search;