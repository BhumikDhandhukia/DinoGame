export const  getCustomProperty=(ground, property )=>{

        
        return parseFloat(getComputedStyle(ground).getPropertyValue(property))||0;
}

export const setCustomProperty=(ground,property,value)=>{
        return ground.style.setProperty(property,value)

}

export const incrementCustomProperty=(ground,property,inc)=>{
       
        setCustomProperty(ground,property,getCustomProperty(ground,property)+inc)
}



export const randomNumberBetween=(min,max)=>{
        return Math.floor(Math.random()*(max-min+1)+min)
}