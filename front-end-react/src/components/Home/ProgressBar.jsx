import '../../../../../front-end-shared/css/Home/ProgressBar.css'

export function ProgressBar({completed}) {

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


    return (
        <div className='container-progress'>
            <div className='container-styles' style={{backgroundColor: '#e0e0de'}}>
                {/* <div className='border'/> */}
                <div className='filler-styles' style={{width: `${completed}%`, backgroundColor: color}} />
            </div>
            <span className='label-styles'>{`${completed}%`}</span>
        </div>
      )
}