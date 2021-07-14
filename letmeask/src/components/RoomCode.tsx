import copyImg from '../assets/images/copy.svg'
import '../styles/roomCode.scss';

type RoomCodeProps = {

    code: string;
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomToClipboard(){

        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={copyRoomToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
            </div>
            <span>Room #235234624333246344 </span>
        </button>
    )
}