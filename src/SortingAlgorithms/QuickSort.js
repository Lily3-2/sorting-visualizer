import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const QuickSort = () =>{
   const myState = useSelector(state => state.updateProps); // Access Redux state
   const dispatch = useDispatch(); // Initialize dispatch function

   // Extract values and IDs from Redux state
   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);

   // Function to swap two elements in the array
   const swap = (arr,i,j) => {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
   }

   // Partition function for quick sort
   const partition = (values,ids,l,r,timer) => {
      let pivot = values[r];

      let j = l-1;
      for(let i = l; i < r; i++){
         if(values[i]<pivot){
            j++;
            swap(values,i,j);
            swap(ids,i,j);
            // Update element positions using CSS transform property
            document.getElementById(ids[i]).style.transform = `translateX(${i*11}px)`;
            document.getElementById(ids[j]).style.transform = `translateX(${j*11}px)`;
         }
      }
      swap(values,r,j+1);
      swap(ids,r,j+1);

      setTimeout(() => {

         document.getElementById(ids[j+1]).childNodes[1].style.backgroundColor = 'white';
         setTimeout(() => {
            // Restore original background color
            document.getElementById(ids[j+1]).childNodes[1].style.backgroundColor = myState.color;
         },myState.speed*6-10)

         // Update element positions using CSS transform property
         document.getElementById(ids[r]).style.transform = `translateX(${r*11}px)`;
         document.getElementById(ids[j+1]).style.transform = `translateX(${(j+1)*11}px)`;

      },myState.speed*timer*6);
      return j+1;
   }

   // Recursive Quick Sort algorithm implementation
   const quickSort = (values,ids,l,r,timer) => {
      if(l<r){
         let ind = partition(values,ids,l,r,timer);
         quickSort(values,ids,l,ind-1,timer-1);
         quickSort(values,ids,ind+1,r,timer-1);
      }
   }
   
   // Solve function to initiate Quick Sort
   const solve = () => {

      quickSort(values,ids,0,values.length-1,Math.ceil(Math.log(values.length+1)));

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
      },6*myState.speed*(1+Math.ceil(Math.log(values.length+1)))+100);
   }
   
   // Listen for changes in Redux state and trigger sorting
   useEffect(() => {
      if(myState.algorithm==='quick'){
         if(myState.play)
            solve(); // Initiate sorting
      }
   },[myState.play]);

   return <></>; //  Return empty JSX fragment(no visible rendering)
}

export default QuickSort;

/* This code defines a React functional component QuickSort that implements the Quick Sort algorithm to sort an array of values based on the Redux state. The solve function contains the sorting logic with timed animations and updates. The useEffect hook listens for changes in the Redux state and triggers the sorting process when the "play" button is pressed. The component itself doesn't render any visible content (<></>) as its purpose is to manage the sorting process. */