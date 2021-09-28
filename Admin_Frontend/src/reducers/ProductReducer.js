export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };

    default:
      return state;
  }
};
