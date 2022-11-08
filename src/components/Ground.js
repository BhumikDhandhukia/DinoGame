import React,{useEffect,useState}from 'react'
import groundimage from '../imgs/ground.png'
// import {delta} from './World'
import CSS from './css/ground.module.css'
import { getCustomProperty,setCustomProperty,incrementCustomProperty ,randomNumberBetween} from './services/ground.service'
const SPEED = 0.05;
export var speedscale= 0
var ground0=0;
var ground1=0;
const infiniteGround = (g) =>{
  

  
  if((getCustomProperty(g,'--left')<=-300))
  {
    incrementCustomProperty(g,'--left',600)
    
  }

}


export const updateGround=(delta)=>{
    speedscale+=delta*0.0001
    incrementCustomProperty(ground0,'--left',delta*SPEED*-1*speedscale);
    incrementCustomProperty(ground1,'--left',delta*SPEED*-1*speedscale);
    infiniteGround(ground0);
    infiniteGround(ground1);

}

export const setupGround=()=>{

  setCustomProperty(ground0,'--left',0);
  setCustomProperty(ground1,'--left',300);
}


const Ground = () => {

 useEffect(() => {

  console.log('USEEFFECT GROUND')
   ground0=document.getElementById('myground0');
   ground1=document.getElementById('myground1')
   setupGround()
 }, [])
 


  

  return (
    

    <div>
            <img  name = 'myground'  id= 'myground0' src={groundimage}  className={CSS.ground}/>
            <img  name = 'myground'  id= 'myground1' src={groundimage}  className={CSS.ground}/>
    </div>
    
  )
}

export default Ground