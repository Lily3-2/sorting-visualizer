import { combineReducers } from "redux";
import updateProps from "./updateProps"; // Import the reducer from updateProps.js

// Combine reducers using combineReducers
const rootReducer = combineReducers({updateProps}); // Combine the updateProps reducer

// Export the combined root reducer
export default rootReducer;