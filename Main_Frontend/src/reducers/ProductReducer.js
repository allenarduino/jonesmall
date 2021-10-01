export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };

    case "FETCH_SINGLE_CATEGORY_PRODUCTS":
      return {
        ...state,
        single_category_products: action.payload
      };

    default:
      return state;
  }
};
