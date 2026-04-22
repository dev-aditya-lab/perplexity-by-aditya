import {  useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../../../Redux/reducers/auth.slice.js';
import { getMe, loginUser, registerUser } from '../services/auth.api.js';

export const useAuth = () => {
    const dispatch = useDispatch();
    
    async function handleRegisterUser({ username, email, password }) {
        dispatch(setLoading(true));
        try {
            await registerUser({ username, email, password });
        } catch (error) {
            dispatch(setError(error.message || 'Registration failed'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLoginUser({ emailOrUsername, password }) {
        dispatch(setLoading(true));
        try {
            const userData = await loginUser({ emailOrUsername, password });
            dispatch(setUser(userData.user ?? userData));
            return userData;
        } catch (error) {
            dispatch(setError(error.message || 'Login failed'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }    
    }

    async function handleGetMe() {
        dispatch(setLoading(true));
        try {
            const userData = await getMe();
            dispatch(setUser(userData));
        } catch (error) {
            dispatch(setError(error.message || 'Failed to fetch user data'));
            throw error;
        }finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleGetMe,
        handleLoginUser,
        handleRegisterUser
    }
}