import cookie from "react-cookies";
import { REMOVE_VALUE } from "../action/cartAction";

const initialState = {
  products: [],
};

// if (localStorage.getItem("cartProducts") != null) {
//   initialState.products = JSON.parse(localStorage.getItem("cartProducts"));
// }

var cartItems = cookie.load("cartProducts");

if (cartItems !== undefined) {
  initialState.products = cartItems;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VALUE":

      var item = action.payload;

      if (cartItems === undefined) {
        var singleData = [];
        singleData.push(item);
        cookie.save("cartProducts", singleData, { path: "/" });
      } else {
        var oldData = cartItems;
        oldData.push(item);
        cookie.save("cartProducts", oldData, { path: "/" });
      }
      return {
        ...state,
        products: [...state.products, item],
      };

    case REMOVE_VALUE:
      cookie.save("cartProducts", action.payload, { path: "/" });
      return {
        ...state,
        products: action.payload,
      };

    case "REMOVE_ALL_VALUE":
      if (cookie.load("cartProducts")) {
        cookie.remove("cartProducts", { path: "/" });
      }
      return {
        ...state,
        products: action.payload,
      };
    default: {
      return state;
    }
  }
};
