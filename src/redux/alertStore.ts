const initialState: IAlertState = {
  textAlert: null,
};

export const SHOW_ALERT = "alert/SHOW_ALERT";
export const CLOSE_ALERT = "alert/CLOSE_ALERT";

const alertReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        textAlert: action.textAlert,
      };
    case CLOSE_ALERT:
      return { textAlert: null };
    default:
      return state;
  }
};

export const alertShow = (data: IAlertState) => ({ type: SHOW_ALERT, ...data });
export const alertClose = () => ({ type: CLOSE_ALERT });

interface IAlertState {
  textAlert: string | null;
}

export default alertReducer;
