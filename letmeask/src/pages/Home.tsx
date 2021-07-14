import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
// import { resourceLimits } from 'worker_threads';


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } =  useAuth();
    const [ roomCode, setRoomCode ] = useState('');
    
    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ' '){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        history.push(`/rooms/${roomCode}`);

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo Google"/>
                        Create your room with google account
                    </button>
                    <div className="separator">or enter in another room</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Type your room code"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Get in there
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}