import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import {
    InstantSearch,
    Hits,
    Pagination,
  } from 'react-instantsearch-dom';

  import {
    Avatar,
    Paper
  } from '@material-ui/core'

  import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

  import algoliasearch from 'algoliasearch';
import SearchResult from './SearchResult';
import search from './api/search'
import CustomSearchBox from './common/SearchBar';

  const searchClient = algoliasearch('EGZO4IJMQL', '883fd25a4271423ab63d5cb5d5096f72');

const Hit = ({ hit }) => {
    return (
      <Paper elevation={3} class="hit-container" style={{padding: 10,  width: 230, height: 210}}>
        <div class="d-flex flex-row align-items-center">
        <Avatar src={hit.photo_url} />
        <div>
        <Typography>
          {hit.display_name}
        </Typography>
        <Typography>
          {hit.certification}
        </Typography>
        </div>
        </div>

 
          <p>
          {hit.bio}
          </p>


        <div>
        <p>
          {hit.bio}
          </p>
        </div>

        <div>
        <p>
          {hit.hourly_payment_rate}
          </p>
        </div>
      </Paper>
      )
}

function Search(props) {
    const classes = useStyles();
    const theme = useTheme();
  
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [searchHits, setSearchHits] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleOnSearch = (query) => {
   const results = search(query)
   results.then(hit => {
    console.log('cdsdfd: ' + hit)
   })

  }
    

  const renderSearchResults = () => {
      return searchHits.map(hit => {
          return <SearchResult result={hit} resultType="USER" />
      })
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

    return (
        <div class="full">
             <section class="title">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-dark">
          <button type="button navbar-brand" class="btn btn-primary">Lupa</button>
 
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
             <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
         <li class="nav-item">
         <button type="button" class="btn btn-primary">Contact</button>
          </li>
          <li class="nav-item">
          <button type="button" class="btn btn-primary">Our Vision</button>
          </li>
          <li class="nav-item">
          <button type="button" class="btn btn-primary" onClick={() => window.location.replace('localhost:3000/search')}>See trainers</button>
          </li>
      </ul> 
    </div> 
          </nav>
        </div>
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
        style={{width: 160, height: 60}}
         classes={classes.root}
          native
          value={age}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Certification</InputLabel>
        <Select
        style={{width: 160, height: 60}}
         classes={classes.root}
          native
          value={age}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Rate</InputLabel>
        <Select
        style={{width: 160, height: 60}}
         classes={classes.root}
          native
          value={age}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        
      </FormControl>
      </section>

      <section id="search">
      <InstantSearch indexName="dev_USERS" searchClient={searchClient}>
          <CustomSearchBox />
          <Hits hitComponent={Hit} />
      </InstantSearch>
    </section>

    
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
  }));
  

export default Search;