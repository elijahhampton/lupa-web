import '../../App.css';
import { useState, useEffect } from 'react'
import {
  useParams
} from 'react-router-dom';

const LupaProgramRecommendation = props => {
  const { programUUID } = useParams();

  useEffect(() => {
    if (typeof (programUUID) == 'undefined') {
      window.location.replace(`lupahealth://programs/${programUUID}`)
    }

    window.location.replace(`lupahealth://programs/${programUUID}`)

  }, [programUUID]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#23374d' }}>
      <script>
        {window.location.replace(`lupahealth://programs/${programUUID}`)}
      </script>
    </div>
  )
}

export default LupaProgramRecommendation;
