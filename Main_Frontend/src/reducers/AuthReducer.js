export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
        loading: false
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        loading: false
      };
    case "FETCH_USER":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
