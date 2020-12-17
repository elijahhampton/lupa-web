

const functions = require('firebase-functions')
const admin = require("firebase-admin");

const cors = require('cors')({ origin: true, credentials: true });
const stripe = require('stripe')
  ('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');

const firebaseConfig = {
  apiKey: "AIzaSyAPrxdNkncexkRazrgGy4FY6Nd-9ghZVWE",
  authDomain: "lupa-cd0e3.firebaseapp.com",
  databaseURL: "https://lupa-cd0e3.firebaseio.com",
  projectId: "lupa-cd0e3",
  storageBucket: "lupa-cd0e3.appspot.com",
  messagingSenderId: "413569093565",
  appId: "1:413569093565:ios:c61a094c14a7e82613ccd4"
};
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp(firebaseConfig)

exports.retrieveProgramDataForPurchase = functions.https.onRequest(async (request: any, response: any) => {
  return cors(request, response, async () => {
    const programUUID = request.body.program_id;
    const programOwnerUUID = request.body.program_owner_uuid;
    const purchaserUUID = request.body.purchaser_uuid;
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    response.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");

    console.log('ProgramUUID: ' + programUUID)
    console.log('Program Owner UUID: ' + programOwnerUUID)
    console.log('Purchaser UUID: ' + purchaserUUID)
    console.log("Starting to retrieve the data")

    if (request.method === 'OPTIONS') {
      request.end();
    }
    if (typeof (programUUID) == 'undefined') {
      console.log('Sorry uuid undefined')
      response.status(200).send({ 
        programData: -1,
        programOwnerData: -1,
        purchaserData: -1
       })
      return;
    }

    let programData = {}, programOwnerData = {}, purchaserData = {};
    console.log('Fetching program data')
    await admin.firestore().collection('programs').doc(programUUID).get().then((documentSnapshot: any) => {
      programData = documentSnapshot.data();
    });

    await admin.firestore().collection('users').doc(programOwnerUUID).get().then((documentSnapshot: any) => {
      programOwnerData = documentSnapshot.data();
    });

    await admin.firestore().collection('users').doc(purchaserUUID).get().then((documentSnapshot: any) => {
      purchaserData = documentSnapshot.data();
    });


    if (typeof (programData) == 'undefined'
    || typeof(programOwnerData) == 'undefined'
    || typeof(purchaserData) == 'undefined') {
      response.status(200).send({ 
        programData: -1,
        programOwnerData: -1,
        purchaserData: -1
       })
    } else {
      response.status(200).send({ 
        programData: programData,
        programOwnerData: programOwnerData,
        purchaserData: purchaserData 
      })
    }
  })
})

exports.makeProgramPurchaseToTrainer = functions.https.onRequest(async (request: any, response: any) => {
  return cors(request, response, async () => {  
  const actualAmount = request.body.amount * 100;
  const programUUID = request.body.program_uuid
  const purchaserUUID = request.body.purchaser_uuid;

  console.log('makePaymentToTrainer::PROGRAM UUID: ' + programUUID)
  
    console.log('makePaymentToTrainer::started');
    console.log('makePaymentToTrainer::Account ID: ' + request.body.trainer_account_id)
    console.log('makePaymentToTrainer::Amount: ' + request.body.amount)
    console.log('makePaymentToTrainer::card_source: ' + request.body.requester_card_source)
    

    //Get a list of the stripe external accounts
    const externalAccountsList = await stripe.accounts.listExternalAccounts(
      request.body.trainer_account_id,
      {object: 'bank_account', limit: 1}
    );
      
    //Get the id of the first external account
    const externalAccount = externalAccountsList.data[0].id
    console.log('makePaymentToTrainer::External account is: ' + externalAccount);

    //Calculate the Lupa payout
    const amountWithoutStripeFee = (actualAmount - ((actualAmount * 0.25) + 0.25));
    const lupaPayout = (actualAmount * 0.16)
  
    console.log('makePaymentToTrainer::Lupa Payout: ' + lupaPayout)
    console.log('makePaymentToTrainer::Amount without stripe fee: ' + amountWithoutStripeFee)
  
  // Create a PaymentIntent:
  await stripe.paymentIntents.create({
    amount: actualAmount,
    currency: 'usd',
    payment_method: request.body.requester_card_source,
    customer: request.body.requester_customer_id,
    payment_method_types: ['card'],
    transfer_group: 0,
    confirm: true,
    transfer_data: {
      destination: request.body.trainer_account_id,
    },
    application_fee_amount: lupaPayout,
  }, {
    idempotencyKey: Math.random().toString(),
  }).then(async (intent: any) => {
    console.log('makePaymentToTrainer::Successfully completed payment intent: ' + intent)

    let programData = {}
   await admin.firestore().collection('programs').doc(programUUID).get().then((documentSnapshot: any) => {
      programData = documentSnapshot.data();
    })
    
    await admin.firestore().collection('users').doc(purchaserUUID).get().then((documentSnapshot: any) => {
      const userData = documentSnapshot.data();
      
      let updatedProgramDataList = userData.program_data;
      let variationProgramData = programData;

      updatedProgramDataList.push(variationProgramData);

      admin.firestore().collection('users').doc(purchaserUUID).update({
        program_data: updatedProgramDataList
      })
    })
  }).catch((error: any) => {
    console.log('makePaymentToTrainer::Payment intent failed with error: ' + error)
  })
})
})