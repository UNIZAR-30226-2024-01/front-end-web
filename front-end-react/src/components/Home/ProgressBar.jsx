import '../../../../../front-end-shared/css/Home/ProgressBar.css'

export function ProgressBar({completed, width='500px', height='70px'}) {

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


    return (
        <div className='container-progress' style={containerStyles}>
            <div className='container-styles' style={{backgroundColor: '#e0e0de'}}>
                <div className='filler-styles' style={{width: `${completed}%`, backgroundColor: color}} />
                <div className='border'/>
            </div>
            <span className='label-styles'>{`${completed}%`}</span>
        </div>
      )
}