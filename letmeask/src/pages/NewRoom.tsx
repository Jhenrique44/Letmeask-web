
import { Link } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
// import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

    // const { user } = useAuth();

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
                    {/* <h1>{user?.name}</h1> */}
                    <h2>Create a new room</h2>
                    <form>
                        <input 
                            type="text"
                            placeholder="Room name"
                        />
                        <Button type="submit">
                            Crate Room
                        </Button>
                    </form>
                    <p>Want to join a existent room? <Link to="/">Click here</Link></p>
                </div>
            </main>
        </div>
    )

}