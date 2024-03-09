import '../../../../../../front-end-shared/css/Chat/special-message.css';

export function SpecialMessage({props}) {
    const who = "MrSoper"
    const what = "cable de red"
    const where = "cafeteria"
    return (
        <li className="notification">
            <div>
                <p><strong>{props.username}</strong> preguntó:</p>
                <p className='question'>¿ha sido {who} con un {what} en la {where}?</p>
                {/* <p>¿ha sido <strong>{who}</strong> con un <strong>{what}</strong> en la <strong>{where}</strong>?</p> */}
            </div>
        </li>
    );
}