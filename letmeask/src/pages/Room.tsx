import { useParams} from 'react-router-dom';

import {Button} from '../components/Button';
import logoImg from '../assets/images/logo.svg';

import {RoomCode} from '../components/RoomCode';
import '../styles/rooms.scss';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string,{
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;

}
type RoomParams = {
    id:string;
}

export function Room(){
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    const roomId = params.id;

    useEffect(()=> {

       const roomRef = database.ref(`rooms/${roomId}`);
       
       roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.question ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                } 
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
       })
    },[roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') {
            return;
        }

        if(!user){
            throw new Error("User not found");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar:user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');

    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk"/>
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Room {title}</h1>
                    {questions.length > 0 && <span>{questions.length} question</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="What do you want to ask?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value = {newQuestion}
                    />

                    <div className= "form-footer">
                        { user ? (
                            <div className = "user-info">
                                <img src="{user.avatar}" alt="{user.name}"/>
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>To send a question, <button>do your signIn</button>.</span>    
                        ) }
                        <Button type ="submit" disabled = {!user}>Send Question</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    );
}