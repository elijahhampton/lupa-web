import './App.css';
import { useState, useEffect } from 'react'

function LupaProgramRecommendation(props) {

  useEffect(() => {
    if (typeof(props.match.params.programUUID) == 'undefined') {
        window.location.replace(`lupahealth://programs/${props.match.params.programUUID}`)
    }

    window.location.replace(`lupahealth://programs/${props.match.params.programUUID}`)
    
  }, [props.match.params.programUUID]);

  return (
      <div style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
          <script>
          {window.location.replace(`lupahealth://programs/${props.match.params.programUUID}`)}
          </script>
      </div>
  )
}

export default LupaProgramRecommendation;
