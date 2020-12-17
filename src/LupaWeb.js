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
  CircularProgress
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

    /*if (!stripe || !element) {
      alert('Stripe has not loaded')
      //Stripe has not loaded yet.  Disable form submission until stripe has loaded.
      return;
    }

    const cardElement = document.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      //axios request
     
  }*/

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
      <Container style={{width: size.width, height: size.height, backgroundColor: 'rgb(244, 247, 252)'}}>
     <AppBar color="primary" style={{flexDirection: 'row', width: '100%', height: 40, backgroundColor: '#FFFFFF', justifyContent: 'flex-start', alignItems: 'center'}}>
     <img src={Logo} alt="Logo" style={{padding: 5, width: 25, height: 25}} />
     <Typography variant="h6" style={{color: 'black'}}>
         Lupa Checkout
     </Typography>
     </AppBar>
     <Box height={size.height / 2.5} >
     <Box style={{padding: 10, marginTop: DIV_MARGIN_SEPARATOR_LENGTH}}>
     <h2 style={{}}>
       Confirm and Pay
     </h2>
       <h5 id="programNameText">
       Please make the payment, after you will have full access to this program from your dashbaord.
       </h5>
     </Box>
       <Paper style={{padding: 5, paddingTop: 10, paddingBottom: 10}}>
     <CardElement
 options={{
   style: {
     base: {
       fontSize: '16px',
       color: '#424770',
       '::placeholder': {
         color: '#aab7c4',
       },
     },
     invalid: {
       color: '#9e2146',
     },
   },
 }}
/>
</Paper>

<Box display="flex" flexDirection="row" alignItems="center" style={{flexDirection: 'row'}}>
 <CheckBox color="#1089ff" checked={true} />
<Typography style={{padding: 10}}>
  Remember card information
</Typography>
</Box>
</Box>


<Box display="flex" flexDirection="column">
 <Typography align="center" style={{fontSize: 12}}>
   You are purchasing {programData.program_name}.
 </Typography>
</Box>
  
  <Box display="flex" flexDirection="column" alignSelf="center" alignItems="center" position="absolute" bottom={0}>
  <Typography align="center" style={{padding: 20}} variant="caption">
  Before purchasing a program please read the Lupa Terms of Service.
 </Typography>

 <Button 
 onClick={handlePurchaseProgram}
 variant="contained" 
 style={{
   width: '80%', 
   alignSelf: 'center', 
   backgroundColor: '#1089ff', 
   padding: 10, 
   color: 'white',
   alignSelf: 'center',
   marginBottom: 30
 }}>
     Pay {programData.program_price}
 </Button>
  </Box>

   </Container>
       )
    }
}
  return renderWebView()
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
