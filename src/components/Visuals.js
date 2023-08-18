import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BubbleSort from '../SortingAlgorithms/BubbleSort';
import InsertionSort from '../SortingAlgorithms/InsertionSort';
import QuickSort from '../SortingAlgorithms/QuickSort';
import MergeSort from '../SortingAlgorithms/MergeSort';
import SelectionSort from '../SortingAlgorithms/SelectionSort';

import './Visuals.css';


function Visuals() {

   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();
   const color = myState.color;
   const range = myState.range;

   const changeValues = () => {

      let new_arr = [...myState.values];
      for(let i = 0; i < new_arr.length; i++)
         document.getElementById(i).style.transform = `translateX(${i*11}px)`;

      dispatch({
         type:'CHANGE_VALUES'
      })
   }

   const handlePlayPause = (play) => {
      if(!myState.play){
         document.getElementById('change-btn').disabled = true;
         document.getElementById('change-btn').style.backgroundColor = 'grey';
         document.getElementById('play-btn').disabled = true;
         document.getElementById('play-btn').style.backgroundColor = 'grey';
      }
      else{
         return;
      }
      dispatch({
         type: 'PLAY_PAUSE',
         _play: play
      })
   }

   useEffect(() => {
      if(!myState.play){
         document.getElementById('play-btn').disabled = false;
         document.getElementById('play-btn').style.backgroundColor = '#000';
         document.getElementById('change-btn').disabled = false;
         document.getElementById('change-btn').style.backgroundColor = '#000';
      }
   },[myState.play]);

   let speed = myState.speed;
   if(myState.algorithm==='selection')
      speed *= 3;
   else if(myState.algorithm==='merge')
      speed *= 5;
   else if(myState.algorithm==='quick')
      speed *= 6;
  return (
    <div className="visuals">
      <div className="visualizer">
         {myState.algorithm==='quick' && <div className="legend"><div className="legend__lable"></div> Pivot elements</div>}
         {
            <div className="visual__items" style={{width:`${myState.values.length*11}px`}}>
               {
                  myState.values.map((item) => {
                     
                     return <div className="visual__item" key={item[1]} id={item[1]} style={{transition:`${speed/1000}s linear all`, transform:`translateX(${item[1]*11}px)`}}>
                              <h4>{item[0]}</h4>
                              <div className="visual" style={{height:`${item[0]*3}px`, backgroundColor:color, width:(range<35? '8px': '6px')}}></div>
                           </div>
                  })
               }   
            </div>
         }
      </div>
      <div className="visual__btns">
         <button id = 'change-btn' onClick = {changeValues}>New Array</button>   
           <button id='play-btn' onClick={() => handlePlayPause(true)}>Sort</button>
      </div>

      <BubbleSort/>
      <InsertionSort />
      <MergeSort />
      <QuickSort />
      <SelectionSort />
   </div>
  )
}


export default Visuals;


