
import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
// import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState} from 'react'
import { database } from '../services/firebase';

export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');  //state

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        
        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        })

        history.push(`/rooms/${firebaseRoom.key}`)

    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustration for question and answer"/>
                <strong>Create rooms Q&amp;A in live </strong>
                <p>Take your doubts of your audience in live</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask"/>
                    <h2>Create a new room</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Room name"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Crate Room
                        </Button>
                    </form>
                    <p>
                        Want to join a existent room? <Link to="/">click here</Link>
                    </p>
                </div>
            </main>
        </div>
    )

}