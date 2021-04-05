import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment';

import {
  InstantSearch,
  SearchBox,
  Hits,
  connectHits
} from 'react-instantsearch-dom';

import {
  Avatar,
} from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch';

import Modal from 'react-modal';
import { booking, extractDateStringFromFormattedMoment, createBookingRequest } from '../../lupa/booking';
import firebase from '../../firebase/firebase';
import ContainedButton from '../../components/contained-button/ContainedButton';

import { Sentry } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { useHistory } from 'react-router';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    display: 'flex',
    width: '55%',
    height: 380,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
};
 

const searchClient = algoliasearch('EGZO4IJMQL', '883fd25a4271423ab63d5cb5d5096f72');

const BookingModal = ({ trainerData, isVisible, closeModal }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [dateValue, onChangeDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    let bookingData = booking;
    bookingData['start_time'] = moment(new Date(dateValue)).format().toString()
    bookingData['end_time'] = moment(new Date(dateValue)).add(1, 'hour').format().toString()
    bookingData['date'] = extractDateStringFromFormattedMoment(moment(dateValue).format().toString())
    bookingData['session_type'] = document.getElementById('sessionType').value;
    bookingData['date_requested'] = new Date();
    bookingData['uid'] = Math.random().toString();
    bookingData['trainer_uuid'] = trainerData.user_uuid;
    bookingData['requester_uuid'] = firebase.auth().currentUser.uid;

    setLoading(true);
    await createBookingRequest(bookingData)
    .then(() => {
      closeModal();
    })
    .catch(error => {
      closeModal();
      alert(error)
    })

    setLoading(false);
  }

  return (
    <Modal
    isOpen={isVisible}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    {
      loading ?
      <div>
        <Sentry />
      </div>
      :
      <>
       <h2 className='text-center'>You are ready to book a session with {trainerData.display_name}.</h2>
     <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column align-items-center'>
    {/* register your input into the hook by invoking the "register" function */}
    <div className='d-flex flex-column align-items-center my-2'>
    <label>Session Type</label>
    <select name="sessionType" id='sessionType' ref={register}>
        <option value="in_person">In Person</option>
        <option value="remote">Virtual</option>
      </select>
    </div>

    <div className='d-flex flex-column align-items-center my-2'>
    <label>Session Date/Time</label>
    <DateTimePicker
        onChange={onChangeDate}
        value={dateValue}
      />
    </div>
    
    </form>

    <div className='my-3 d-flex flex-row align-items-center justify-content-evenly w-100'>
    <ContainedButton onClick={onSubmit}>
      Book Trainer
    </ContainedButton>
    <ContainedButton inverted onClick={closeModal}>
      Cancel
    </ContainedButton>
    </div>
    </>
 
    }

   

    
  </Modal>
  )
}

const Hit = ({ hit, handleOnSelectBookTrainer }) => {
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
        <button type="button" class="btn btn-sm btn-outline-dark" onClick={handleOnSelectBookTrainer}>View {hit.display_name}</button>
      </div>
    </div>
  )
}

function Search(props) {
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState({ user_uuid: -1 });

  const history = useHistory();

  const handleOnSelectBookTrainer = async (trainer) => {
    if (trainer) {
      //await setSelectedTrainer(trainer);
      //setBookingModalVisible(true)
      history.push(`/trainer/${trainer.user_uuid}`)
    }
  }

  return (
    <div class="container-fluid">
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

        <InstantSearch indexName="dev_USERS" searchClient={searchClient}>
          <SearchBox />
          <Hits  hitComponent={({ hit }) => (
              <Hit hit={hit} handleOnSelectBookTrainer={() => handleOnSelectBookTrainer(hit)} />
          )} />
        </InstantSearch>
      </div>
      <BookingModal isVisible={bookingModalVisible} closeModal={() => setBookingModalVisible(false)} trainerData={selectedTrainer} />
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