import '../../../../../front-end-shared/css/Home/ProgressBar.css';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../consts';

export function ProgressBar({ width = '550px', height = '70px' }) {
  const colorPalette = ['red', 'orange', 'yellow', 'green', 'blue']; // Define your color palette here

  const [completed, setCompleted] = useState(undefined);
  const [level, setLevel] = useState(undefined);

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
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.XP); // 621
    return data.XP;
  };

  const calculateLevel = (xp) => {
    // xp = 700;
    // console.log(Math.floor(Math.sqrt(xp))); // 24
    // console.log(Math.floor(Math.pow(xp, 0.4))); // 13
    return Math.floor(Math.pow(xp, 0.4)) /* Math.floor(Math.sqrt(xp)) */;
  };

  const calculateXP = (lvl, xp) => {
    // console.log((Math.trunc((Math.pow(xp, 0.4) - lvl) * 100))); // 9
    // console.log(Math.trunc((Math.sqrt(xp) - lvl) * 100) ); // 91
    // const percentage = Math.trunc((Math.sqrt(xp) - lvl) * 100);
    const percentage = Math.trunc((Math.pow(xp, 0.4) - lvl) * 100);
    setCompleted(percentage);
  };

  useEffect(() => {
    obtainXP().then((xp) => {
      const lvl = calculateLevel(xp);
      console.log(lvl);
      setLevel(lvl);
      calculateXP(lvl, xp);
    });
  }, []);

  let color;
  switch (completed) {
    case completed < 20:
      color = colorPalette[0];
      break;
    case completed < 40:
      color = colorPalette[1];
      break;
    case completed < 60:
      color = colorPalette[2];
      break;
    case completed < 80:
      color = colorPalette[3];
      break;
    default:
      color = colorPalette[4];
  }

  // Set default values
  !completed ?? setCompleted(0);
  !level ?? setLevel(0);

  return (
    <div className="container-progress" style={containerStyles}>
      <div className="container-styles" style={{ backgroundColor: '#e0e0de' }}>
        <div className="filler-styles" style={{ width: `${completed}%`, backgroundColor: color }} />
        <div className="border" />
      </div>
      {completed && <span className="xp-percentage">{`${completed}%`}</span>}
      {level && <span className="xp-level">{`Lvl: ${level}`}</span>}
    </div>
  );
}
