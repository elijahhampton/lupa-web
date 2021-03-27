import '../../App.css';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const LupaTrainerRecommendation = props => {
  const { trainerUUID } = useParams();

  useEffect(() => {
    if (typeof (trainerUUID) == 'undefined') {
      window.location.replace(`lupahealth://trainers/${trainerUUID}`)
    }

    window.location.replace(`lupahealth://trainers/${trainerUUID}`)
  }, [trainerUUID]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#23374d' }}>
      <script>
        {window.location.replace(`lupahealth://trainers/${trainerUUID}`)}
      </script>
    </div>
  )
}

export default LupaTrainerRecommendation;
