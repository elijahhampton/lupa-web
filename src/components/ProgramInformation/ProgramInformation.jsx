import React, { useRef, useState } from "react";
import { useTransition, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import VisibilitySensor from "react-visibility-sensor";

import useOnScreen from "../../hooks/useOnScreen";

import './styles.css';

const ProgramInformation = (props) => {
  const [items, setItems] = useState([
    {
      key: 0,
      text: "Tools made specifically for personal trainers to drive business.",
      style: { fontSize: 30, fontWeight: "bold", color: "#23374d", textAlign: 'right' },
    },
    {
      key: 1,
      text:
        "Create your own personalized fitness programs and run your business on Lupa.",
      style: { fontSize: 20, fontWeight: "200", color: "#23374d", textAlign: 'right' },
    },
  ]);
  const transitions = useTransition(items, (item) => item.key, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)", animationDelay: 1000 },
    leave: { transform: "translate3d(0,40px,0)" },
  });

  const renderAnimation = (i) => {
    alert(i);
  };

  return (
    <div className='program-information'>
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={props}>
            <h2 style={item.style} className='text-center text-md-end'> {item.text} </h2>
          </animated.div>
        );
      })}
    </div>
  );
};

export default ProgramInformation;
