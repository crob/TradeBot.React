import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../../models/user';
import { AppplicationState } from '../combineReducers';
import { apiCallBegan } from "../middleware/api-middleware";

export interface UserState {
  current: User | null;
  loading: boolean;
  error: any;
  userCreated: boolean;
  fetched: boolean;
}

const initState: UserState = {
  current: null,
  loading: false,
  error: false,
  userCreated: false,
  fetched: false,
};

const slice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    userRequested: (user: UserState, action: PayloadAction<User>) => {
      user.loading = true;
    },
    userRequestFailed: (user: UserState, action: PayloadAction) => {
      user.loading = false;
      user.current = null;
      user.fetched = true;
    },
    userReceived: (user: UserState, action: PayloadAction<User>) => {
      user.loading = false;
      user.current = action.payload;
      user.fetched = true;
    },
    user: (user: UserState, action: PayloadAction<User>) => {
      user.loading = false;
      user.current = action.payload;
    },
    userLoggedIn: (user: UserState, action: PayloadAction<User>) => {
      user.userCreated = false;
      user.current = action.payload;
      user.error = false;
      user.fetched = true;
    },
    loginRequested: (user: UserState, action: PayloadAction<User>) => {
      user.loading = true;
      user.error = false;
      /*
      we try to login the user in post signup, if that call fails it will loop if userCreated
      is set to true.
      */
      user.userCreated = false;
    },
    loginRequestFailed: (user: UserState, action: PayloadAction<User>) => {
      user.loading = false;
      user.error = true;
    },
    logoutRequested: (user: UserState, action: PayloadAction) => {
      user.loading = true;
    },
    logoutRequestFailed: (user: UserState, action: PayloadAction) => {
      user.loading = false;
    },
    userLoggedOut: (user, action: PayloadAction<User>) => {
      user.current = null;
      user.loading = false;
    },
    saveUserRequest: (user, action: PayloadAction<User>) => {
      user.userCreated = false;
      user.loading = true;
      user.error = false;
    },
    savedUser: (user, action: PayloadAction<User>) => {
      user.userCreated = true;
      user.loading = false;
      user.error = false;
    },
    saveUserRequestFailed: (user, action: PayloadAction<string>) => {
      user.userCreated = false;
      user.loading = false;
      user.error = action.payload;
    },
  },
});

const {
  userLoggedIn,
  loginRequested,
  loginRequestFailed,
  userLoggedOut,
  userRequested,
  userRequestFailed,
  userReceived,
  logoutRequested,
  logoutRequestFailed,
  saveUserRequest,
  savedUser,
  saveUserRequestFailed,
} = slice.actions;
export default slice.reducer;

export const userReceivedAction = userReceived;
export const userLoggedOutAction = userLoggedOut;
export const userLoggedInAction = userLoggedIn;

export const getUserState = (state: AppplicationState) => state.user;

export const getCurrentUser = (state: AppplicationState) => state.user.current;

export const fetchUser = () => (dispatch: any, getState: any) => {
  return dispatch(
    apiCallBegan({
      url: "auth/user",
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const logout = () => (dispatch: any, getState: any) => {
  return dispatch(
    apiCallBegan({
      url: "auth/logout",
      onStart: logoutRequested.type,
      onSuccess: userLoggedOut.type,
      onError: logoutRequestFailed.type,
    })
  );
};

export const login = (data: any) => (dispatch: any, getState: any) => {
  if (!getState().user.loading) {
    return dispatch(
      apiCallBegan({
        url: "auth/login",
        method: "post",
        data,
        onStart: loginRequested.type,
        onSuccess: userLoggedIn.type,
        onError: loginRequestFailed.type,
      })
    );
  }
};

export const saveNewUser = (data: any) => (dispatch: any, getState: any) => {
  return dispatch(
    apiCallBegan({
      url: "register",
      method: "post",
      data,
      onStart: saveUserRequest.type,
      onSuccess: savedUser.type,
      onError: saveUserRequestFailed.type,
    })
  );
};
