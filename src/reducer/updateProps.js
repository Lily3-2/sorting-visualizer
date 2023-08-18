import { ActionTypes } from "@mui/base";

// Initial state for the reducer
const initializer = {
   algorithm: 'bubble',
   color: '#8871fd',
   speed: 100,
   range: '30',
   play: false,
   values: [],
   timeouts:[]
};

// Reducer function to handle state updates based on dispatched actions
const updateProps = (state=initializer,action) => {
   switch(action.type){
      
      case 'UPDATE_RANGE':{
         // Generate an array with random values based on the new range
         let arr=[];
         for(let i = 0; i < action.range; i++)
            arr.push([Math.floor(Math.random()*100)+1,i]);

         // Update state with new range and generated values array
         return {...state, range:action.range, values:arr};
      }

      case 'UPDATE_VALUES': {
         // Update state with new values array
         return {...state,values:action._values};
      }

      case 'UPDATE_SPEED':{
         // Update state with new speed
         return {...state, speed:action.speed};
      }

      case 'UPDATE_COLOR':{
         // Update state with new color
         return {...state, color:action.color};
      }

      case 'UPDATE_ALGORITHM':{
         // Update state with new algorithm
         return {...state, algorithm:action.algorithm};
      }

      case 'UPDATE_TIEMOUTS':{
         // Update state with new timeouts array
         return {...state, timeouts:action._timeouts};
      }

      case 'CHANGE_VALUES':{
         // Generate a new random values array based on the current range
         let arr=[],range = state.range;
         for(let i = 0; i < range; i++)
            arr.push([Math.floor(Math.random()*100)+1, i]);
         // Update state with new values array
         return {...state,values:arr};
      }

      case 'PLAY_PAUSE': {
         // Update state with play/pause status
         return {...state,play:action._play};
      }

      default:
         return state;
   }
}

export default updateProps; // Export the reducer function