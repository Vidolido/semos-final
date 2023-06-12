import { useAuthContext } from './useAuthContext';
import { LOGOUT } from '../misc/actionTypes';

export const useLogout = () => {
	const { dispatch } = useAuthContext();

	const logout = () => {
		localStorage.removeItem('TicketBlasterUser');

		// го бришеме корисникот од AuthContext
		// TODO: да проверам дали треба уште нешто да исчистам од state-от после logout
		dispatch({ type: LOGOUT });
	};

	return { logout };
};
