export const initialState = null;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SPONSOR":
      return { ...state, userType: 'sponsor', userId:action.userId,userName: action.username };
    case "EVENT ORGANIZER":
      return { ...state, userType: 'event organizer', userId:action.userId, userName: action.username };
    case "ADMIN":
        return { userType: 'admin', userName: 'admin' };
    case "CLEAR":
        return { userType: null, userName: null }; // Return initial state to clear user state
    // case "USER_CONNECTED":
    //     return { ...state, onlineUsers: [...state.onlineUsers, action.user] }; // Add connected user
    // case "USER_DISCONNECTED":
    //     return { ...state, onlineUsers: state.onlineUsers.filter(user => user !== action.user) }; // Remove disconnected user
    default:
      return state;
  }
};
