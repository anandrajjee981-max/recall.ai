import { register, login, getme } from '../service/auth.api.js';
import { authStart, authFailure, authSuccess } from '../slice/auth.slice.js';
import { useDispatch } from 'react-redux';

export default function useAuth() {
  const dispatch = useDispatch();

  async function handleregister(username, email, password) {
    dispatch(authStart());
    try {
      const data = await register(username, email, password);
      dispatch(authSuccess({ user: data.user ?? null, token: data.token ?? null }));
      return { success: true, data };
    } catch (error) {
      const message = error?.message || 'Registration failed';
      dispatch(authFailure(message));
      return { success: false, error: message };
    }
  }

  async function handlelogin(email, password) {
    dispatch(authStart());
    try {
      const data = await login(email, password);
      dispatch(authSuccess({ user: data.user ?? null, token: data.token ?? null }));
      return { success: true, data };
    } catch (error) {
      const message = error?.message || 'Login failed';
      dispatch(authFailure(message));
      return { success: false, error: message };
    }
  }

  async function handlegetme() {
    dispatch(authStart());
    try {
      const data = await getme();
      dispatch(authSuccess({ user: data.user ?? null, token: data.token ?? null }));
      return { success: true, data };
    } catch (error) {
      const message = error?.message || 'Failed to load user';
      dispatch(authFailure(message));
      return { success: false, error: message };
    }
  }

  return { handleregister, handlelogin, handlegetme };
}












