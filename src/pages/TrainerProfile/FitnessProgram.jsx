import React, { useState, useEffect } from 'react';
import './styles.css';

import {
    Container,
    Divider,
    CircularProgress,
    CardMedia,
    Card,
  } from '@material-ui/core';

  import ContainedButton from '../../components/contained-button/ContainedButton'

  import Photo from '../../assets/images/fitness-girls.jpeg'

  import firebase from '../../firebase/firebase';

const FitnessProgram = ({ id }) => {
    const [programData, setProgramData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [componentDidErr, setComponentDidErr] = useState(false);

    useEffect(() => {
        async function loadProgramData() {
            await firebase.firestore().collection('programs').doc(id).get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data();
                    setProgramData(data);
                } else {
                    setComponentDidErr(true)
                }
            })
            .catch(error => {
                setComponentDidErr(true);
            })
        }

        setLoading(true);
        loadProgramData();
        setLoading(false);

    }, [id, componentDidErr, ])

    const renderComponent = () => {
        if (loading || componentDidErr) {
            return <div></div>
        } else {
            return (
                <>
                <div className='fitness-program w-100 p-3 d-flex flex-row align-items-center justify-content-between small'>
                    <div className='w-50 d-flex flex-row align-items-start justify-content-start'>
                    <Card raised className='fitness-program-card'>
                      <CardMedia component="img" src={programData && programData.program_image} style={{ margin: 0, padding: 0, alignSelf: 'center', width: '100%', height: '100%' }} />
                    </Card>
        
                    <div className='d-flex flex-column align-items-start justify-content-start px-3'>
                        <h6>
                            {programData && programData.program_name}
                        </h6>
                        <p>
                            {programData && programData.program_description}
                        </p>
                        <p>
                            ${Number(programData && programData.program_price).toFixed(2)}
                        </p>
                    </div>
                    </div>

                    <div className='w-50 h-100 d-flex flex-column align-items-end justify-content-between p-3'>
                        <div className='py-5 d-flex flex-column align-items-start'>
                          <p className='strong'>
                          Number of exercises provided: {programData && programData.num_exercises}
                          </p>

                          <p className='strong'>
                              Required Equipment: None
                          </p>
                        </div>
                        
                        <ContainedButton>
                        View on the Lupa App
                        </ContainedButton>
                    </div>
                    
                </div>
                <hr />
                </>
            )
        }
    }

    return renderComponent()
}

export default FitnessProgram;