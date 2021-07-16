import { useHistory, useParams} from 'react-router-dom';

import {Button} from '../components/Button';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'

import {RoomCode} from '../components/RoomCode';
import '../styles/rooms.scss';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { database } from '../services/firebase';





type RoomParams = {
    id:string;
}

export function AdminRoom(){
    // const {user} = useAuth();

    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const {title, questions} = useRoom(roomId);

    async function handleEndRoom() {
       await database.ref(`rooms/${roomId}`).update({
           endedAt: new Date(),
       })

       history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Are you sure that you want to delete this question?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk"/>
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutLined onClick = {handleEndRoom}>End Room</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Room {title}</h1>
                    {questions.length > 0 && <span>{questions.length} question</span>}
                </div>
                
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}  //unique key   
                                content={question.content}
                                author = {question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                
                                >
                                    <img src={deleteImg} alt="Remove Question"/>
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}