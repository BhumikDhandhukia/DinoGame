import React , {useEffect} from 'react'
import { speedscale } from './Ground'
import CactusImage from '../imgs/cactus.png';
import  './css/cactus.css'
import CSSS from './css/world.module.css'
import { setCustomProperty, randomNumberBetween, incrementCustomProperty  } from './services/ground.service';

const SPEED = 0.05;
const MINIMUM_INTERVAL=2000;
const MAXIMUM_INTERVAL=4000;

let world = 0;
let nextCactusTime=MINIMUM_INTERVAL


export const getCactusRects=()=>{
      return [...document.querySelectorAll("[data-cactus]")].map(cactus=>{
        return cactus.getBoundingClientRect()
      })
}

const createCactus =()=>{
  console.log("CREATE CACTUS")

  const cactus = document.createElement('img');
  cactus.dataset.cactus=true;
  
  cactus.src=CactusImage;
  cactus.classList.add('cactus')

  world.append(cactus)
  setCustomProperty(cactus,"--left",100)

 
}

export const  setUpCactus=(delta)=>{
    nextCactusTime = MINIMUM_INTERVAL;

}

export const updateCactus=(delta)=>{

  console.log(speedscale)

    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
         incrementCustomProperty(cactus, "--left" , delta*speedscale*SPEED*-1)
    })

  if (nextCactusTime<=0)
  {
    createCactus()
    nextCactusTime=randomNumberBetween(MINIMUM_INTERVAL,MAXIMUM_INTERVAL)/speedscale
  }
  nextCactusTime -= delta

}

const Cactus = () => {


  useEffect(() => {
    
  world= document.getElementById('world')
  console.log(world)
    
  }, [])
  
  return (
    <>
        <div id = 'world' style={{width:"100%" , height : "100%"}}>

        </div>
    
    </>
  )
}

export default Cactus