import React, {useEffect} from 'react'
import CSS from './css/dino.module.css'
import { speedscale } from './Ground';
import dinoimageStationary from '../imgs/dino-stationary.png'
import dinoImageRun0 from '../imgs/dino-run-0.png';
import dinoImageRun1 from '../imgs/dino-run-1.png';
import { getCustomProperty, incrementCustomProperty, setCustomProperty } from './services/ground.service';
const dinoImages =[dinoImageRun0,dinoImageRun1]



var dino = 0;
let isJumping
var currentFrameTime=0
let dinoFrame=0
//Constant values

const JUMP_SPEED=0.5;
const GRAVITY=0.002
const DINO_FRAMES=2;
let FRAME_TIME = 1000;


let Yvelocity=0;


export const getDinoRect = () => {
      return dino.getBoundingClientRect()
}


const handleJump=(delta)=>{

      if(!isJumping)
      {
        return
      }
      incrementCustomProperty(dino,"--bottom", Yvelocity*delta);
      if(getCustomProperty(dino,"--bottom")<=0)
      {
        setCustomProperty(dino,"--bottom",0);
        isJumping=false
      }
      Yvelocity-=GRAVITY*delta;

}



const handleRun=(delta)=>{

  if(isJumping){
    console.log(dino)
    dino.src= dinoimageStationary
    return
  }
  if(currentFrameTime>=FRAME_TIME)
  {
      //onsole.log(dino)
      dinoFrame = parseInt(dinoFrame+1)% DINO_FRAMES;
      //console.log(dinoFrame)
      dino.src=dinoImages[dinoFrame]
      currentFrameTime=0
  }
 // console.log(currentFrameTime)
  currentFrameTime+=delta*speedscale

  
}




export const updateDino=(delta)=>{
 

  handleRun(delta)
  handleJump(delta)

}
export const setUpDino =()=>{

  isJumping=false;
  dinoFrame=0;
  currentFrameTime=0
  document.addEventListener('keydown',onJump)
  setCustomProperty(dino,"--bottom",0);

  


}

const onJump =(e)=>{
  console.log(e)

  if(e.code !== 'Space'|| isJumping) return
  Yvelocity=JUMP_SPEED;
  isJumping=true
}

const Dino = () => {


  useEffect(() => {
    
      dino=document.getElementById('dino');
      setUpDino()

    
  }, [])
  
  return (
      
          

                <img className={CSS.dino}  src = {dinoimageStationary} id='dino'/>
           
    
    
  )
}

export default Dino