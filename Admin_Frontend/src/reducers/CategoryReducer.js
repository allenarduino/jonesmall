export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        )
      };

    default:
      return state;
  }
};
