import firebase from '../firebase/firebase';

export let booking = {
    start_time: new Date(),
    end_time: new Date(),
    date: new Date(),
    date_requested: new Date(),
    trainer_uuid: 0,
    requester_uuid: 0,
    status: 4,
    uid: 0,
    note: "",
    session_type: ''
}

export function extractDateStringFromFormattedMoment(moment) {
    const dateString = moment.split('T')[0];
    return dateString;
}

export async function createBookingRequest(booking) {
    const requesterUUID = booking.requester_uuid;
    const trainerUUID = booking.trainer_uuid;

    let isFirstSession = true;

    await firebase.firestore().collection('bookings')
        .get()
        .then(async querySnapshot => {
            await querySnapshot.docs.forEach(doc => {
                let data = doc.data();

                if (data.requester_uuid == requesterUUID && data.trainer_uuid == trainerUUID) {
                    isFirstSession = false;
                }
            });

            booking.isFirstSession = isFirstSession;
        });

    //create booking
    await firebase.firestore().collection('bookings').doc(booking.uid).set(booking)
        .then(docRef => {
            console.log('success')
        })
        .catch(error => {
            console.log(error)
        });


    //add the booking uuid to both users booking fields
    //the requester
    firebase.firestore().collection('users').doc(requesterUUID).get().then(documentSnapshot => {
        let userBookings = documentSnapshot.data().bookings;

        if (typeof(userBookings) != 'undefined') {
            if (booking && booking.uid)
            {
                userBookings.push(booking.uid);

                firebase.firestore().collection('users').doc(requesterUUID).update({
                    bookings: userBookings
                })
            }
        }

    });

    await firebase.firestore().collection('users').doc(trainerUUID).get().then(documentSnapshot => {
        let userData = documentSnapshot.data();

        let trainerBookings = userData.bookings;

        if (typeof(trainerBookings) != 'undefined') {
            if (booking && booking.uid)
            {
                trainerBookings.push(booking.uid);

                firebase.firestore().collection('users').doc(trainerUUID).update({
                    bookings: trainerBookings
                })
            }
        }
    }).catch(error => {
        console.log('error for trainer?')
    })


    //send notification to trainer. here we just need to add the notification to the users notification list and
    //allow firebase fucntions to do the rest

    //create notification
    const receivedProgramNotificationStructure = {
        notification_uuid: Math.random().toString(),
        data: booking,
        from: requesterUUID,
        to: trainerUUID,
        read: false,
        type: "BOOKING_REQUEST",
        actions: ['Accept', 'View', 'Delete'],
        timestamp: new Date().getTime()
    }

    //add notification to users notification array
    let userNotifications = [];


    await firebase.firestore().collection('users').doc(trainerUUID).get().then(snapshot => {
        userNotifications = snapshot.data().notifications;

        if (typeof(userNotifications) != 'undefined') {
            userNotifications.push(receivedProgramNotificationStructure);

            firebase.firestore().collection('users').doc(trainerUUID).update({
                notifications: userNotifications,
            });
        }
    })

    return Promise.resolve(true);
}