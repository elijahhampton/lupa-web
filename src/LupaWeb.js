import './App.css';

import { useState, useEffect } from 'react'
import MediaQuery from 'react-responsive';
import {
  Button, 
  Paper, 
  TextField, 
  Box,
  AppBar,
  Typography,
  Container,
  Divider,
  CircularProgress,
  CardMedia,
  Card
} from '@material-ui/core';

import Logo from './logo.jpg'

import {CardElement, useStripe, useElements, Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { shadows } from '@material-ui/system';
import { FirestoreCollection } from 'react-firestore';
import { CheckBox, FormatAlignJustify } from '@material-ui/icons';
const DIV_MARGIN_SEPARATOR_LENGTH  = 25;

const PURCHASE_PROGRAM_WEB_ENDPOINT = "https://us-central1-lupa-cd0e3.cloudfunctions.net/makeProgramPurchaseToTrainer"

function LupaWeb(props) {
  const stripe = useStripe();
  const element = useElements();
  const size = useWindowSize();
  const [componentReady, setComponentReady] = useState(false);
  const [componentDidErr, setComponentDidErr] = useState(false);
  const [programData, setProgramData] = useState({})
  const [programOwnerData, setProgramOwnerData] = useState({})
  const [purchaserData, setPurchaserData] = useState({})

  const LOAD_PROGRAM_DATA_ENDPOINT = "https://us-central1-lupa-cd0e3.cloudfunctions.net/retrieveProgramDataForPurchase";

  useEffect(() => {

    async function loadProgramData() {
      const {programOwnerUUID, programUUID, purchaserUUID } = props.match.params;
      await axios({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: LOAD_PROGRAM_DATA_ENDPOINT,
        data: JSON.stringify({
            program_id: programUUID,
            program_owner_uuid: programOwnerUUID,
            purchaser_uuid: purchaserUUID
        })
    }).then(response => {
      const program = response.data.programData;
      const programOwner = response.data.programOwnerData;
      const purchaserData = response.data.purchaserData;
      if (program == -1) {
        setComponentReady(false);
        throw "Error"
      } else {
        setProgramData(program);
        setProgramOwnerData(programOwner);
        setPurchaserData(purchaserData)
        setComponentReady(true);
      }
    }).catch(error => {
      setComponentReady(false)
    })
    }

    loadProgramData()
  }, [props.match.params.programUUID]);

  const handlePurchaseProgram = async (event) => {
    event.preventDefault();

  const {programUUID, purchaserUUID} = props.match.params;

  axios({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'POST',
    url: PURCHASE_PROGRAM_WEB_ENDPOINT,
    data: JSON.stringify({
       // payment_method: paymentMethod,
        amount: Number(programOwnerData.hourly_payment_rate),
        trainer_account_id: programOwnerData.stripe_metadata.account_id,
        requester_card_source: purchaserData.stripe_metadata.card_source,
        requester_customer_id: purchaserData.stripe_metadata.stripe_id,
        program_uuid: programUUID,
        purchaser_uuid: purchaserUUID
    })
}).then(response => {
}).catch(error => {
})
}

const renderWebView = () => {
  if (componentReady == false) {
    return (
      <Container style={{width: size.width, height: size.height, alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress color="blue" />
      </Container>
    )
  } else {
    return (
      <Container style={{display: 'flex', flex: 1, width: size.width, height: size.height}}>
     <div style={{display: 'flex', paddingTop: DIV_MARGIN_SEPARATOR_LENGTH, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>

     <div style={{display: 'flex', flex: 3, flexDirection: 'column'}}>
       <div>
       <h2 style={{ paddingTop: DIV_MARGIN_SEPARATOR_LENGTH, paddingBottom: 5, margin: 0}}>
       Checkout
     </h2>
     <h6 style={{padding: 0, margin: 0, color: '#AAAAAA'}}>
       1 Item
     </h6>
       </div>
  
      

       <Divider style={{marginTop: 30, marginBottom: 30,}} />

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column',}}>
          <Card raised>
          <CardMedia el component="img" src={programData.program_image} style={{margin: 0, padding: 0, alignSelf: 'center', width: '100%'}} />
          </Card>
     

        <div style={{ width: '100%', paddingTop: 10}}>
          <h5 style={{padding: 0, margin: 0, paddingBottom: 5}}>
            {programData.program_name}
          </h5>
          <h6 style={{fontSize: 12, padding: 0, margin: 0, fontWeight: '300', color: '#AAAAAA'}}>
            {programData.program_description}
          </h6>
        </div>
        </div>

        <Divider style={{marginTop: 30, marginBottom: 10}} />

        <div>
        <h5 style={{padding: 0, margin: 0}}>
            Total: {programData.program_price}
          </h5>
        </div>
     </div>

  


<div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>

<h6 style={{fontSize: 10, color: 'black', padding: 0, margin: 0, fontWeight: '200', textAlign: 'left'}}>
Before purchasing a program please read the Lupa Terms of Service.
</h6>

<h6 style={{fontSize: 10, color: 'black', padding: 0, margin: 0, fontWeight: '200', textAlign: 'left'}}>
After purchasing, your program will be made available on your dashboard.
</h6>

 <Button 
 onClick={handlePurchaseProgram}
 variant="contained" 
 style={{
   width: '80%', 
   backgroundColor: '#1089ff', 
   color: 'white',
   alignSelf: 'center',
 }}>
     Buy Now
 </Button>

</div>
</div>
   </Container>
       )
    }
}
  return renderWebView()
}

const styles = {
  media: {
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  }
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default LupaWeb;
