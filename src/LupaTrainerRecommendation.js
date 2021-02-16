import './App.css';
import { useState, useEffect } from 'react'

function LupaTrainerRecommendation(props) {

  useEffect(() => {
    if (typeof(props.match.params.trainerUUID) == 'undefined') {
      window.location.replace(`lupahealth://trainers/${props.match.params.trainerUUID}`)
    }

    window.location.replace(`lupahealth://trainers/${props.match.params.trainerUUID}`)
  }, [props.match.params.trainerUUID]);

  return (
      <div style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
          <script>
             {window.location.replace(`lupahealth://trainers/${props.match.params.trainerUUID}`)}
          </script>
      </div>
  )
}

export default LupaTrainerRecommendation;
