import * as fromAuthActions from './auth.actions';

export interface State {
  token:string,
  authenticated:boolean
}
const initialState: State = {
  token:null,
  authenticated:false
};

export function authReducer(state = initialState, action:fromAuthActions.AuthActions){

  switch(action.type){
    case (fromAuthActions.SIGN_UP):
    case (fromAuthActions.SIGN_IN):
      return{
        ...state,
        authenticated:true
      };
    case (fromAuthActions.LOG_OUT):
      return{
        ...state,
        token:null,
        authenticated:false
      };
    case (fromAuthActions.SET_TOKEN):
      return{
        ...state,
        token:(<fromAuthActions.SetToken>action).payload.token
      };

    default:
      return state;
  }
}
