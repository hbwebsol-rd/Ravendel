import { combineReducers } from "redux";

import login from "./loginReducer";
import settings from "./settingReducer";
import cart from "./cartReducer";
import products from "./productReducers";
import blogs from "./blogReducer";
import homepage from "./homepageReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  settings,
  cart,
  products,
  blogs,
  homepage,
});

export default MasterReducer;
