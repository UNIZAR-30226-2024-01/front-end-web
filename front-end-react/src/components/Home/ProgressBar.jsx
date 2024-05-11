import '../../../../../front-end-shared/css/Home/ProgressBar.css';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../consts';
import React from 'react';

export function ProgressBar({ width = '100%', height = '70px', completedSetter, lvlSetter }) {
  const colorPalette = ['red', 'orange', 'yellow', 'green', 'blue']; // Define your color palette here

  const [completed, setCompleted] = useState(undefined);
  const [level] = useState(undefined);

  const containerStyles = {
    height: height,
    width: width,
  };

  const [cookies] = useCookies(['user']);

  /* 
    Obtain XP from the DB and calculate the level. Level is calculated by the following formula:
    level = floor(sqrt(xp)); where xp is the amount of experience points the user has (obtained from the DB)
    xp_in_level = (level+1)^2 - xp
    */
  const obtainXP = async () => {
    const url = `${BACKEND_URL}/obtainXP?username=${cookies.username}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.XP;
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 31);
    // return Math.floor(Math.pow(xp, 0.15));
  };

  const calculateXP = (/* lvl,  */xp) => {
    // const percentage = Math.trunc((Math.pow(xp, 0.15) - lvl) * 100);
    const percentage = Math.trunc(((xp % 31) / 31) * 100);
    completedSetter(percentage);
    setCompleted(percentage);
  };

  useEffect(() => {
    obtainXP().then((xp) => {
      const lvl = calculateLevel(xp);
      // console.log(lvl);
      lvlSetter(lvl);
      calculateXP(/* lvl,  */xp);
    });
  }, []);

  let color;
  if (completed < 20) {
    color = colorPalette[0];
  } else if (completed < 40) {
    color = colorPalette[1];
  } else if (completed < 60) {
    color = colorPalette[2];
  } else if (completed < 80) {
    color = colorPalette[3];
  } else {
    color = colorPalette[4];
  }

  // Set default values
  !completed ?? completedSetter(0);
  !level ?? lvlSetter(0);

  return (
    <div className="container-progress" style={containerStyles}>
      <div className="container-styles" style={{ backgroundColor: '#e0e0de' }}>
        <div className="filler-styles" style={{ width: `${completed}%`, backgroundColor: color }} />
        <div className="border" />
      </div>
    </div>
  );
}