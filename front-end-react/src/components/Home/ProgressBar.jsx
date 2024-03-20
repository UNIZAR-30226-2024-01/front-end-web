import '../../../../../front-end-shared/css/Home/ProgressBar.css'
import { useCookies } from 'react-cookie'

import { URL } from '../../consts'

export function ProgressBar({completed, width='550px', height='70px'}) {

    const colorPalette = ['red', 'orange', 'yellow', 'green', 'blue']; // Define your color palette here

    let color;
    if (completed <= 20) {
        color = colorPalette[0];
    } else if (completed <= 40) {
        color = colorPalette[1];
    } else if (completed <= 60) {
        color = colorPalette[2];
    } else if (completed <= 80) {
        color = colorPalette[3];
    } else {
        color = colorPalette[4];
    }

    const containerStyles = {
        height: height,
        width: width
    }

    const [cookies] = useCookies(['user'])

    /* 
        Obtain XP from the DB and calculate the level. Level is calculated by the following formula:
        level = 100 * 1.2^(xp); where xp is the amount of experience points the user has (obtained from the DB)
    */
    const obtainXP = async () => { 
        const url = URL + '/obtainXP';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: cookies.user,
            }),
        });
        const data = await response.json();
        return data.xp;
    }

    const calculateLevel = async () => {
        const xp = await obtainXP();
        return Math.floor(100 * Math.pow(1.2, xp));
    }

    return (
        <div className='container-progress' style={containerStyles}>
            <div className='container-styles' style={{backgroundColor: '#e0e0de'}}>
                <div className='filler-styles' style={{width: `${completed}%`, backgroundColor: color}} />
                <div className='border'/>
            </div>
            <span className='xp-percentage'>{`${completed}%`}</span>
            <span className='xp-level'>{`Lvl: 22`}</span>
        </div>
      )
}