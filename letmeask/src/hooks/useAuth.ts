import {useContext} from 'react';
import { AuthContext} from '../contexts/AuthContext';

export function useAuth(){ //HOOKS 
    const value = useContext(AuthContext)

    return value;
}