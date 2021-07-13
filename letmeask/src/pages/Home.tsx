import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
// import { resourceLimits } from 'worker_threads';


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } =  useAuth();
    
    async function handleCreateRoom(){

        if(!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new');

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