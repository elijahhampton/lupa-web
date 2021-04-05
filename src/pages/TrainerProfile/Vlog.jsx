import React, { useEffect, useState } from 'react';
import './styles.css';

import firebase from '../../firebase/firebase';

const Vlog = ({ id }) => {
    const [vlogData, setVlogData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [componentDidErr, setComponentDidErr] = useState(false);

    useEffect(() => {
        async function loadVlogData() {
            await firebase.firestore().collection('vlogs').doc(id).get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data();
                    setVlogData(data);
                } else {
                    setComponentDidErr(true)
                }
            })
            .catch(error => {
                setComponentDidErr(true);
            })
        }

        setLoading(true);
        loadVlogData();
        setLoading(false);

    }, [id, componentDidErr])
    
    const renderComponent = () => {
        if (loading || componentDidErr) {
            return <div></div>
        } else {
            return (
                <>
                <div className='vlog'>
                    
                </div>
                <hr />
                </>
            )
        }
    }

    return renderComponent();
}

export default Vlog;