const initialState: AuthState = {
  id: null,
  login: null,
  isAuth: false,
};

export const LOGIN = "auth/LOGIN";
export const LOGUOT = "auth/LOGIN";

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.id,
        login: action.login,
        isAuth: true,
      };
    case LOGUOT:
      return { ...state, id: null, login: null, isAuth: false };
    default:
      return state;
  }
};

export const setUserCreate = (data: AuthState) => ({ type: LOGIN, ...data });

export default authReducer;

interface AuthState {
  id: number | string | null;
  login: number | string | null;
  isAuth: boolean;
}

interface SetUserAction {
  type: typeof LOGIN;
  userId: number | null;
  login: string | null;
}
interface ResetUserAction {
  type: typeof LOGUOT;
}

export type AuthActionTypes = SetUserAction | ResetUserAction;
