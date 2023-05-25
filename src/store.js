import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  quote: "",
  author: "",
  color: "#16a085",
};

function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_QUOTE":
      return { ...state, quote: action.payload };
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

const store = createStore(quoteReducer);

export default store;
