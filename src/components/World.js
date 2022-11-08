import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import CSS from './css/world.module.css'

//COMPONENTS
import Ground, { updateGround , setupGround,speedscale} from './Ground'
import Dino , {setUpDino,updateDino, getDinoRect}from './Dino';
import Cactus,{setUpCactus,updateCactus,getCactusRects} from './Cactus';


const startGame =(e)=>{
  lastTime=null
  setupGround()
  var ele= document.getElementById('start_text')
 ele.innerHTML=""
  console.log(e)
  window.requestAnimationFrame(update)

}
let lastTime=null
let score= 12;
const update =(time) =>
{

  if(lastTime===null)
  {
      lastTime=time ;
      window.requestAnimationFrame(update);
      
  }

const delta =time-lastTime;
  updateDino(delta);
  updateCactus(delta);
  updateGround(delta);
  if(checkLose()){return HandleLose()}
  score=score+delta*0.01;
  var ele= document.getElementById('score')
  ele.innerHTML='SCORE : '+Math.floor(score)

  lastTime=time;
 
  
  window.requestAnimationFrame(update)
}

const checkLose = () => {

  const dinorect = getDinoRect();
  return getCactusRects().some(rect => isCollision(rect,dinorect))
}


const isCollision = (rect1,rect2) => {
        return rect1.left<rect2.right && rect1.top<rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top
}

const HandleLose = () => {
 
  alert("GameOver.Your Score is " + Math.floor(score))
  window.location.reload()

}
const World = () => {
    useEffect(() => {
      console.log('useEffect WORLD')
      document.addEventListener('keydown',startGame, {once:true})

    }, [])
    return (
        <>
            <div className={CSS.all} >

                <div className={CSS.world} >
                        <div className={CSS.score} id='score'>Score:</div>
                        <div className={CSS.start_screen} id='start_text'>Press Any Key To Start</div>
                      
                        <Ground/>
                        <Dino/>
                        <Cactus/>
                            
                </div>
            </div>
        </>
  )
}

export default World