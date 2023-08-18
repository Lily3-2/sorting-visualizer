import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MergeSort = () => {
   const myState = useSelector(state => state.updateProps); // Access Redux state
   const dispatch = useDispatch(); // Initialize dispatch function

   // Extract values and IDs from Redux state
   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);

   // Recursive Merge Sort function for the algorithm implementation
   const mergeSort = (values,ids,timer,l,r) => {
      if(l >= r)
         return;

      let mid = Math.floor((l+r)/2);

       // Recursively sort left and right halves
      mergeSort(values,ids,timer-1,l,mid);
      mergeSort(values,ids,timer-1,mid+1,r);

      setTimeout(() => {
         // Generate random color for visualization
         let color = [];
         for(let i = 0; i < 3; i++)
            color.push(Math.floor(Math.random()*200));
         
         // Highlight elements being merged with a temporary color
         for(let i = l; i <= r; i++)
            document.getElementById(ids[i]).childNodes[1].style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
         
         // Merge the two sorted halves
         for(let i = l; i <= r; i++){
            for(let j = i+1; j <= r; j++){

            if(values[i]>values[j]){
               [values[i],values[j]] = [values[j],values[i]];
               [ids[i],ids[j]] = [ids[j],ids[i]];
               
               let new_ids = [...ids];
               // Update element positions using CSS transform property
               document.getElementById(new_ids[i]).style.transform = `translateX(${i*11}px)`;
               document.getElementById(new_ids[j]).style.transform = `translateX(${j*11}px)`;
               }
            }
         }
      },timer*myState.speed*5);
   }

   // Solve function to initiate Merge Sort
   const solve = () => {
      mergeSort(values,ids,Math.ceil(Math.log(values.length+1)),0,values.length-1);

      // After sorting completes, update Redux state
      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play:false
         })

         // Change color after sorting completes
         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })
      },5*myState.speed*(1+Math.ceil(Math.log(values.length+1)))+50);
   };

   // Listen for changes in Redux state and trigger sorting
   useEffect(() => {
      if(myState.algorithm==='merge'){
         if(myState.play)
            solve(); // Initiate sorting
      }
   },[myState.play]);

   return <></>; // Return empty fragment (no visible rendering)
}

export default MergeSort;

/* This code defines a React functional component MergeSort that implements the Merge Sort algorithm to sort an array of values based on the Redux state. The solve function contains the sorting logic with timed animations and updates. The useEffect hook listens for changes in the Redux state and triggers the sorting process when the "play" button is pressed. The component itself doesn't render any visible content (<></>) as its purpose is to manage the sorting process. */




