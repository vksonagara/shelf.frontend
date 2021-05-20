import React from "react";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function authReducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case "signin": {
      const auth = {
        isAuthenticated: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user
      };
      return auth;
    }
    case "signout": {
      return { isAuthenticated: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider(accessToken, user) {
  
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
  );


function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthStateProvider");
  }
  return context;
}


function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthStateProvider");
  }
  return context;
}